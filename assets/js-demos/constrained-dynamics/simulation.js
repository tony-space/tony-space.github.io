'use strict';

if (typeof require !== 'undefined')
    var Matrix = require('./matrix');


function derivative(func, arg, epsilon) {
    if (epsilon === undefined)
        epsilon = 1e-6;

    if (typeof arg === 'number') {
        let left = func(arg - epsilon);
        let right = func(arg + epsilon);
        if (typeof left === 'number')
            return (right - left) / (2 * epsilon)
        else if (left instanceof Matrix && left.columns() === 1)
            return right.sub(left).mult(0.5 / epsilon);
        else
            throw new TypeError("not implemented yet");
    }
    else if (arg instanceof Matrix && arg.columns === 1) {
        let result;
        for (let i = 0; i < arg.rows; ++i) {
            let left = arg.clone();
            let right = arg.clone();

            left.setValue(i, 0, left.getValue(i, 0) - epsilon);
            right.setValue(i, 0, right.getValue(i, 0) + epsilon);

            left = func(left);
            right = func(right);

            if (typeof left === 'number') {
                if (!result) result = new Matrix(1, arg.rows());
                result.setValue(0, i, (right - left) / (2 * epsilon));
            }
            else if (left instanceof Matrix && left.columns === 1) {
                if (!result) result = new Matrix(left.rows, arg.rows);
                let deriv = right.sub(left).mult(0.5 / epsilon);
                for (let j = 0; j < deriv.rows; ++j)
                    result.setValue(j, i, deriv.getValue(j, 0));
            }
            else
                throw new TypeError("not implemented yet");
        }
        return result;
    }
    else
        throw new TypeError("not implemented yet");
}

const kd = -0.25;
const gravity = Matrix.createVector([0, 9.8]);

var Simulation = class {
    constructor() {
        this._particles = [];
        this._constrants = [];
    }

    get ks() {
        return 1;
    }

    get kd() {
        return 1;
    }

    get dimensions() {
        return 2;
    }

    get epsilon() {
        return 1e-6;
    }

    addParticle(particle) {
        this._particles.push(particle);
    }

    addConstraint(constraint) {
        this._constrants.push(constraint);
        constraint.setSimulation(this);
    }

    getParticle(index) {
        if (index < 0 || index > this._particles.length)
            throw new RangeError('invalid index');
        return this._particles[index];
    }

    computeForces() {
        this._particles.forEach(p => {
            p.force = gravity.add(p.velocity.mult(kd));
        });
    }

    get state() {
        let result = new Matrix(this._particles.length * this.dimensions * 2, 1);

        this._particles.forEach((p, i) => {
            for (let k = 0; k < this.dimensions; ++k)
                result.setValue(i * this.dimensions + k, 0, p.position.getValue(k, 0));
        });

        let velocityOffset = this.dimensions * this._particles.length;

        this._particles.forEach((p, i) => {
            for (let k = 0; k < this.dimensions; ++k)
                result.setValue(velocityOffset + i * this.dimensions + k, 0, p.velocity.getValue(k, 0));
        });

        return result;
    }

    set state(newState) {
        this._particles.forEach((p, i) => {
            for (let k = 0; k < this.dimensions; ++k)
                p.position.setValue(k, 0, newState.getValue(i * this.dimensions + k, 0));
        });

        let velocityOffset = this.dimensions * this._particles.length;

        this._particles.forEach((p, i) => {
            for (let k = 0; k < this.dimensions; ++k)
                p.velocity.setValue(k, 0, newState.getValue(velocityOffset + i * this.dimensions + k, 0));
        });

        this._particles.forEach(p => p.updateVisual());
        this._constrants.forEach(c => c.updateVisual());
    }

    get stateDerivative() {
        let result = new Matrix(this._particles.length * this.dimensions * 2, 1);

        this._particles.forEach((p, i) => {
            for (let k = 0; k < this.dimensions; ++k)
                result.setValue(i * this.dimensions + k, 0, p.velocity.getValue(k, 0));
        });

        this.computeForces();

        let accelOffst = this.dimensions * this._particles.length;
        let a = this.a;

        this._particles.forEach((p, i) => {
            for (let k = 0; k < this.dimensions; ++k)
                result.setValue(accelOffst + i * this.dimensions + k, 0, a.getValue(i * this.dimensions + k, 0));
        });

        return result;
    }

    get Q() {
        let result = new Matrix(this._particles.length * this.dimensions, 1);

        this._particles.forEach((p, i) => {
            for (let k = 0; k < this.dimensions; ++k)
                result.setValue(i * this.dimensions + k, 0, p.force.getValue(k, 0));
        });

        return result;
    }

    get q() {
        let result = new Matrix(this._particles.length * this.dimensions, 1);

        this._particles.forEach((p, i) => {
            for (let k = 0; k < this.dimensions; ++k)
                result.setValue(i * this.dimensions + k, 0, p.position.getValue(k, 0));
        });

        return result;
    }

    get v() {
        let result = new Matrix(this._particles.length * this.dimensions, 1);

        this._particles.forEach((p, i) => {
            for (let k = 0; k < this.dimensions; ++k)
                result.setValue(i * this.dimensions + k, 0, p.velocity.getValue(k, 0));
        });

        return result;
    }

    C(q) {
        let result = new Matrix(this._constrants.length, 1);
        this._constrants.forEach((c, i) => result.setValue(i, 0, c.compute(q)));
        return result;
    }

    get a() {
        const dimensions = this.dimensions;
        let q = this.q;
        let v = this.v;
        let Q = this.Q;

        let c = this.C(q);

        let j = this.jacobian(q);
        let cv = j.mult(v);
        let jv = this.jacobianDerivative(q, v);

        let jw = j.clone();
        this._particles.forEach((p, i) => this._constrants.forEach((c, j) => {
            for (let k = 0; k < dimensions; ++k)
                jw.setValue(j, i * dimensions + k, jw.getValue(j, i * dimensions + k) / p.mass);
        }));

        let jwjt = jw.mult(j.transpose());
        let jvv = jv.mult(v).mult(-1);
        let jwq = jw.mult(Q);

        let lambda = jwjt.inverse().mult(jvv.sub(jwq).sub(c.mult(this.ks)).sub(cv.mult(this.kd)));
        let constraintForce = j.transpose().mult(lambda);
        this._particles.forEach((p, i) => {
            for (let k = 0; k < dimensions; ++k)
                p.force.setValue(k, 0, p.force.getValue(k, 0) + constraintForce.getValue(i * dimensions + k, 0));
        });

        let a = constraintForce.clone();
        this._particles.forEach((p, i) => {
            for (let j = 0; j < dimensions; ++j)
                a.setValue(i * dimensions + j, 0, p.force.getValue(j, 0) / p.mass);
        });
        return a;
    }

    jacobian(q) {
        return derivative(q => this.C(q), q, this.epsilon);
    }

    jacobianDerivative(q, v) {
        return derivative(q => this.jacobian(q).mult(v), q, this.epsilon);
    }

    step(dt) {
        //runge-kutta
        let k0 = this.state;

        let k1 = this.stateDerivative;

        this.state = k1.mult(dt / 2).add(k0);
        let k2 = this.stateDerivative;

        this.state = k2.mult(dt / 2).add(k0);
        let k3 = this.stateDerivative;

        this.state = k3.mult(dt).add(k0);
        let k4 = this.stateDerivative;

        this.state = k2.add(k3).mult(2).add(k1).add(k4).mult(dt / 6).add(k0);
    }
}

if (typeof module !== 'undefined')
    module.exports = Simulation;