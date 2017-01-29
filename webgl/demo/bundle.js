/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";


class Matrix {
    /**
     *
     * @param {number} rows
     * @param {number} cols
     */
    constructor(rows, cols) {
        this._rows = rows;
        this._cols = cols;

        this._data = new Array(rows * cols);
        for (let i = 0; i < this._data.length; ++i)
            this._data[i] = 0;
    }

    /**
     * @returns {number}
     */
    get rows() {
        return this._rows;
    }

    /**
     * @returns {number}
     */
    get columns() {
        return this._cols;
    }

    /**
     * @param {number} row
     * @param {number} col
     * @param {number} value
     */
    setValue(row, col, value) {
        if (value === undefined) {
            value = col;
            col = 0;
        }

        if (row < 0 || col < 0 || row >= this.rows || col >= this.columns)
            throw new RangeError("invalid index");

        this._data[col + row * this.columns] = value;
    }

    /**
     * @param row
     * @param col
     * @returns {number}
     */
    getValue(row, col) {
        if (col === undefined)
            col = 0;

        if (row < 0 || col < 0 || row >= this.rows || col >= this.columns)
            throw new RangeError("invalid index");

        return this._data[col + row * this.columns];
    }

    /**
     * @returns {Matrix}
     */
    clone() {
        let result = new Matrix(this.rows, this.columns);
        for (let i = 0; i < this.rows; ++i)
            for (let j = 0; j < this.columns; ++j)
                result.setValue(i, j, this.getValue(i, j));
        return result;
    }

    /**
     * @param matrix
     * @returns {Matrix}
     */
    add(matrix) {
        if (matrix.rows != this.rows || matrix.columns != this.columns)
            throw new TypeError("invalid argument");

        let result = new Matrix(this.rows, this.columns);
        for (let i = 0; i < this.rows; ++i)
            for (let j = 0; j < this.columns; ++j)
                result.setValue(i, j, this.getValue(i, j) + matrix.getValue(i, j));
        return result;
    }

    /**
     * @param matrix
     * @returns {Matrix}
     */
    sub(matrix) {
        if (matrix.rows != this.rows || matrix.columns != this.columns)
            throw new TypeError("invalid argument");

        let result = new Matrix(this.rows, this.columns);
        for (let i = 0; i < this.rows; ++i)
            for (let j = 0; j < this.columns; ++j)
                result.setValue(i, j, this.getValue(i, j) - matrix.getValue(i, j));
        return result;
    }

    /**
     * @param tensor
     * @returns {Matrix}
     */
    mult(tensor) {
        if (typeof tensor === 'number') {
            let result = new Matrix(this.rows, this.columns);
            for (let i = 0; i < this.rows; ++i)
                for (let j = 0; j < this.columns; ++j)
                    result.setValue(i, j, this.getValue(i, j) * tensor);
            return result;
        }
        else if (tensor instanceof Matrix) {
            if (this.columns != tensor.rows)
                throw new RangeError("invalid size");

            let result = new Matrix(this.rows, tensor.columns);

            for (let i = 0; i < this.rows; ++i)
                for (let j = 0; j < tensor.columns; ++j) {
                    let sum = 0;
                    for (let k = 0; k < this.columns; ++k)
                        sum = sum + this.getValue(i, k) * tensor.getValue(k, j);

                    result.setValue(i, j, sum);
                }

            return result;
        }
        else
            throw new TypeError("not implemented yet");
    }

    /**
     * @returns {Matrix}
     */
    transpose() {
        let result = new Matrix(this.columns, this.rows);

        for (let i = 0; i < this.rows; ++i)
            for (let j = 0; j < this.columns; ++j)
                result.setValue(j, i, this.getValue(i, j));

        return result;
    }

    /**
     * @returns {Matrix}
     */
    inverse() {
        if (this.rows != this.columns || this.rows < 1)
            throw new TypeError("invalid matrix sizes");

        let result = Matrix.createIdentityMatrix(this.rows);
        let self = this.clone();

        for (let i = 0; i < self.rows; ++i) {
            let diagonal = self.getValue(i, i);
            if (diagonal === 0)
                throw new Error("determinants equals zero");

            for (let j = 0; j < self.columns; ++j) {
                self.setValue(i, j, self.getValue(i, j) / diagonal);
                result.setValue(i, j, result.getValue(i, j) / diagonal);
            }

            for (let k = 0; k < self.rows; ++k) {
                if (k === i) continue;
                let coefficient = self.getValue(k, i);
                for (let j = 0; j < self.columns; ++j) {
                    self.setValue(k, j, self.getValue(k, j) - self.getValue(i, j) * coefficient);
                    result.setValue(k, j, result.getValue(k, j) - result.getValue(i, j) * coefficient);
                }
            }
        }

        return result;
    }


    /**
     * only for vectors
     * @param tensor
     * @returns {number}
     */
    dot(tensor) {
        let valid = Matrix.isVector(this) && Matrix.isVector(tensor) && this.rows === tensor.rows;
        if (!valid)
            throw TypeError('invalid tensor types');
        let sum = 0;
        for (let i = 0; i < this.rows; ++i)
            sum = sum + this.getValue(i, 0) * tensor.getValue(i, 0);
        return sum;
    }

    /**
     * only for vectors
     * @param {Matrix} tensor
     * @returns {Matrix}
     */
    cross(tensor) {
        let valid = Matrix.isVector(this, 3) && Matrix.isVector(tensor, 3);

        if (!valid)
            throw TypeError('invalid tensor types');

        let skewSymmetric = Matrix.fromRows([
            [0, -this.getValue(2), this.getValue(1)],
            [this.getValue(2), 0, -this.getValue(0)],
            [-this.getValue(1), this.getValue(0), 0]
        ]);

        return skewSymmetric.mult(tensor);
    }

    /**
     * only for vectors
     * @returns {number}
     */
    length() {
        if(!Matrix.isVector(this))
            throw TypeError('this is not vector');

        return Math.sqrt(this.dot(this));
    }

    /**
     * @returns {Float32Array}
     */
    toFloat32Array() {
        let rows = this.rows;
        let columns = this.columns;

        let result = new Float32Array(rows * columns);

        for (let j = 0; j < columns; ++j)
            for (let i = 0; i < rows; ++i)
                result[j * rows + i] = this.getValue(i, j);

        return result;
    }

    /**
     * @param data
     * @returns {Matrix}
     */
    static vector(data) {
        let result = new Matrix(data.length, 1);
        data.forEach((e, i) => result.setValue(i, 0, e));
        return result;
    }

    /**
     *
     * @param {Matrix} tensor
     * @param {number} [dimension]
     * @returns {boolean}
     */
    static isVector(tensor, dimension){
        return tensor instanceof Matrix && tensor.columns === 1 && (dimension === undefined || tensor.rows === dimension);
    }

    /**
     * creates i
     * @param {number} [n=4]
     * @returns {Matrix}
     */
    static identity(n) {
        if (!n)
            n = 4;

        let result = new Matrix(n, n);
        for (let i = 0; i < n; ++i)
            result.setValue(i, i, 1);
        return result;
    }

    /**
     *
     * @param {Array<Array<number>>} rows
     * @returns {Matrix}
     */
    static fromRows(rows) {
        let height = rows.length;
        if (height === 0)
            return new Matrix(0, 0);
        let width = rows[0].length;

        if (rows.some(row => row.length !== width))
            throw new TypeError('all rows should have the same length');

        let result = new Matrix(width, height);
        rows.forEach((row, i) => row.forEach((v, j) => result.setValue(i, j, v)));
        return result;
    }

    /**
     *
     * @param {number} left
     * @param {number} right
     * @param {number} top
     * @param {number} bottom
     * @param {number} zNear
     * @param {number} zFar
     * @returns {Matrix}
     */
    static frustum(left, right, top, bottom, zNear, zFar) {
        let result = new Matrix(4, 4);

        result.setValue(0, 0, 2 * zNear / (right - left));
        result.setValue(0, 2, (right + left) / (left - right));
        result.setValue(1, 1, 2 * zNear / (top - bottom));
        result.setValue(1, 2, (top + bottom) / (top - bottom));
        result.setValue(2, 2, -(zFar + zNear) / (zFar - zNear));
        result.setValue(2, 3, -2 * zFar * zNear / (zFar - zNear));
        result.setValue(3, 2, -1);

        return result;
    }

    /**
     *
     * @param {number} fov
     * @param {number} aspect
     * @param {number} zNear
     * @param {number} zFar
     * @returns {Matrix}
     */
    static perspective(fov, aspect, zNear, zFar) {
        let yMax = zNear * Math.tan(fov * Math.PI / 360.0);
        let yMin = -yMax;
        let xMin = yMin * aspect;
        let xMax = yMax * aspect;

        return Matrix.frustum(xMin, xMax, yMax, yMin, zNear, zFar);
    }

    static translate(vec) {
        let valid = vec instanceof Matrix && vec.columns === 1 && (vec.rows === 3 || vec.rows === 4);
        if (!valid)
            throw new TypeError('invalid vector');

        let result = Matrix.identity();

        result.setValue(0, 3, vec.getValue(0, 0));
        result.setValue(1, 3, vec.getValue(1, 0));
        result.setValue(2, 3, vec.getValue(2, 0));
        if (vec.rows === 4)
            result.setValue(3, 3, vec.getValue(3, 0));

        return result;
    }
}

/* harmony default export */ __webpack_exports__["a"] = Matrix;

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Shader__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Program__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Mesh__ = __webpack_require__(3);






/**
 * The most important class of all library
 */
class Context {
    /**
     * @param {HTMLCanvasElement} canvas Where image should be rendered
     */
    constructor(canvas) {
        this._gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
        if (!this._gl) {
            throw new Error('Unable to initialize WebGL context');
        }
        let gl = this.gl;
        gl.viewport(0, 0, canvas.width, canvas.height);
        gl.clearColor(0, 0, 0, 1);
        gl.clearDepth(1.0);
        gl.enable(gl.DEPTH_TEST);
        gl.depthFunc(gl.LEQUAL);
    }

    get gl() {
        return this._gl;
    }

    /**
     * @param {string} srcURI
     * @param {Number} type
     * @returns {Promise<Shader>}
     */
    createShader(srcURI, type) {
        return fetch(srcURI)
            .then(response => response.text())
            .then(source => {
                let gl = this.gl;
                let shader = gl.createShader(type);
                if (!shader) {
                    return Promise.reject(new Error(`invalid type: '${type}'`));
                }

                gl.shaderSource(shader, source);
                gl.compileShader(shader);

                let failed = !gl.getShaderParameter(shader, gl.COMPILE_STATUS);
                if (failed) {
                    let log = gl.getShaderInfoLog(shader);
                    gl.deleteShader(shader);
                    return Promise.reject(new Error(log));
                }

                return new __WEBPACK_IMPORTED_MODULE_0__Shader__["a" /* default */](this, shader);
            });
    }

    /**
     * @param {Array<Shader>} shaders
     * @returns {Promise<Program>}
     */
    createProgram(shaders) {
        if (!shaders || !(shaders instanceof Array) || shaders.length === 0)
            return Promise.reject(new Error('Invalid argument'));

        return Promise.all(shaders)
            .then(shaders => {
                if (shaders.some(s => !(s instanceof __WEBPACK_IMPORTED_MODULE_0__Shader__["a" /* default */])))
                    return Promise.reject(new Error('Promise returned invalid value'));

                if (shaders.some(s => s.context !== this))
                    return Promise.reject(new Error('Shader belongs to other context'));

                let gl = this.gl;

                let program = gl.createProgram();
                if (!program) {
                    return Promise.reject(new Error('Shader program cannot be created'));
                }
                shaders.forEach(s => gl.attachShader(program, s.shader));

                gl.linkProgram(program);
                gl.validateProgram(program);

                let failed = !gl.getProgramParameter(program, gl.LINK_STATUS);
                if(failed){
                    let log = gl.getProgramInfoLog(program);
                    gl.deleteProgram(program);
                    shaders.forEach(s => s.dispose());
                    return Promise.reject(new Error(log));
                }

                return new __WEBPACK_IMPORTED_MODULE_1__Program__["a" /* default */](this, shaders, program);
            })
    }

    /**
     * @param {Program} program
     * @returns {Mesh}
     */
    createMesh(program){
        let valid = program instanceof __WEBPACK_IMPORTED_MODULE_1__Program__["a" /* default */] && program.context === this;
        if(!valid)
            throw new TypeError('invalid program');

        return new __WEBPACK_IMPORTED_MODULE_2__Mesh__["a" /* default */](this, program);
    }
}

/* harmony default export */ __webpack_exports__["a"] = Context;

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Matrix__ = __webpack_require__(0);



const PRECISION = 1e-6;

class Quaternion {
    /**
     * @param {Matrix} vector - 4d unit (+-1e-6) vector
     */
    constructor(vector) {
        if (!__WEBPACK_IMPORTED_MODULE_0__Matrix__["a" /* default */].isVector(vector, 4))
            throw new TypeError('invalid parameter');

        let length = vector.length();

        if (Math.abs(length - 1) > PRECISION)
            throw new TypeError('vector should be unit');

        this._r = vector.getValue(0);
        this._v = __WEBPACK_IMPORTED_MODULE_0__Matrix__["a" /* default */].vector([vector.getValue(1), vector.getValue(2), vector.getValue(3)]);
    }

    /**
     *
     * @param {Quaternion} q
     * @returns {Quaternion}
     */
    mult(q) {
        let r1 = this._r;
        let r2 = q._r;

        let v1 = this._v;
        let v2 = q._v;

        let scalarPart = r1 * r2 - v1.dot(v2);
        let vectorPart = v2.mult(r1).add(v1.mult(r2)).add(v1.cross(v2));

        return new Quaternion(__WEBPACK_IMPORTED_MODULE_0__Matrix__["a" /* default */].vector([
            scalarPart,
            vectorPart.getValue(0),
            vectorPart.getValue(1),
            vectorPart.getValue(2)
        ]));
    }

    /**
     * @returns {Matrix} 4x4
     */
    toMatrix() {
        let q0 = this._r;
        let q1 = this._v.getValue(0);
        let q2 = this._v.getValue(1);
        let q3 = this._v.getValue(2);

        return __WEBPACK_IMPORTED_MODULE_0__Matrix__["a" /* default */].fromRows([
            [1 - 2 * (q2 * q2 + q3 * q3), 2 * (q1 * q2 - q0 * q3), 2 * (q0 * q2 + q1 * q3), 0],
            [2 * (q1 * q2 + q0 * q3), 1 - 2 * (q1 * q1 + q3 * q3), 2 * (q2 * q3 - q0 * q1), 0],
            [2 * (q1 * q3 - q0 * q2), 2 * (q0 * q1 + q2 * q3), 1 - 2 * (q1 * q1 + q2 * q2), 0],
            [0, 0, 0, 1]
        ]);
    }

    /**
     * @param {Matrix} axis
     * @param {Number} angle
     * @returns {Quaternion}
     */

    static rotateRadians(axis, angle) {
        if (!__WEBPACK_IMPORTED_MODULE_0__Matrix__["a" /* default */].isVector(axis, 3))
            throw new TypeError('Axis shoud be 3d vector');

        let length = axis.length();

        if (Math.abs(length) < PRECISION) {
            axis = __WEBPACK_IMPORTED_MODULE_0__Matrix__["a" /* default */].vector([1, 0, 0]);
            angle = 0;
            length = 1;
        }
        axis = axis.mult(1 / length);

        angle *= 0.5;

        let scalarPart = Math.cos(angle);
        let vectorPart = axis.mult(Math.sin(angle));

        return new Quaternion(__WEBPACK_IMPORTED_MODULE_0__Matrix__["a" /* default */].vector([
            scalarPart,
            vectorPart.getValue(0),
            vectorPart.getValue(1),
            vectorPart.getValue(2)
        ]));
    }

    /**
     * @param {Matrix} axis
     * @param {Number} angle
     * @returns {Quaternion}
     */
    static rotateDegrees(axis, angle) {
        return Quaternion.rotateRadians(axis, angle / 180 * Math.PI);
    }
}
/* harmony default export */ __webpack_exports__["a"] = Quaternion;

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Matrix__ = __webpack_require__(0);




class Mesh {

    /**
     * @param {Context} context
     * @param {Program} program
     */
    constructor(context, program) {
        this._context = context;
        this._program = program;
        this._buffers = {};
    }

    /**
     *
     * @param {string} name
     * @param {Matrix} matrix
     */
    setUniformMatrix(name, matrix) {
        let valid = matrix instanceof __WEBPACK_IMPORTED_MODULE_0__Matrix__["a" /* default */] && matrix.rows === matrix.columns && (matrix.rows >= 2 || matrix.rows <= 4);

        if (!valid)
            throw new TypeError('Invalid matrix argument');

        let location = this._program.getUniformLocation(name);
        let gl = this._context.gl;

        this._program.use();
        gl[`uniformMatrix${matrix.rows}fv`](location, false, matrix.toFloat32Array());
    }

    /**
     *
     * @param {string} options.buffer
     * @param {string} options.attribute
     */
    setAttribute(options) {
        if(!options) throw new Error('options expected');
        if(!options.buffer) throw new Error('buffer name expected');
        if(!options.attribute) throw new Error('attribute name expected');

        let gl = this._context.gl;
        let location = this._program.getAttributeLocation(options.attribute);
        let buffer = this._buffers[options.buffer];
        if(!buffer)
            throw new Error('invalid buffer name');

        gl.bindBuffer(buffer.target, buffer.handle);
        gl.vertexAttribPointer(location, buffer.dimensions, buffer.dataType, false, 0, 0);

        this._program.use();
        gl.enableVertexAttribArray(location);
    }

    /**
     * @param {string} options.bufferName
     * @param {number} options.target
     * @param {object} options.data
     * @param {number} options.usage
     * @param {number} [options.dimensions]
     * @param {number} [options.mode]
     * @param {number} options.dataType
     */
    setBufferData(options){
        if(!options) throw new Error('options expected');
        if(!options.bufferName) throw new Error('bufferName expected');
        if(!options.target) throw new Error('target type expected');
        if(!options.data) throw new Error('data expected');
        if(!options.usage) throw new Error('usage mode of buffer expected');
        if(!options.dataType) throw new Error('dataType expected');

        let gl = this._context.gl;
        let buffer;
        if(options.bufferName in this._buffers)
            buffer = this._buffers[options.bufferName].handle;
        else
            buffer = gl.createBuffer();

        gl.bindBuffer(options.target, buffer);
        gl.bufferData(options.target, options.data, options.usage);

        if(!(options.bufferName in this._buffers)) {
            this._buffers[options.bufferName] = {
                handle: buffer,
                dimensions: options.dimensions,
                dataType: options.dataType,
                length: options.data.length,
                target: options.target,
                mode: options.mode
            };
        }
    }

    /**
     * @param {string} indicesBuffer
     */
    render(indicesBuffer){
        let gl = this._context.gl;
        let buffer = this._buffers[indicesBuffer];
        if(!buffer)
            throw new Error('invalid buffer name');

        gl.drawElements(buffer.mode, buffer.length, buffer.dataType, 0);
    }

    dispose() {
        Object.getOwnPropertyNames(this._buffers)
            .forEach(name => this._context.gl.deleteBuffer(this._buffers[name].handle));
        this._buffers = {};
    }
}

/* harmony default export */ __webpack_exports__["a"] = Mesh;

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";


class Program {
    /**
     *
     * @param {Context} context
     * @param {Array<Shader>}shaders
     * @param {WebGLProgram} program
     */
    constructor(context, shaders, program) {
        this._context = context;
        this._shaders = shaders;
        this._program = program;

        this._attributeLocations = {};
        this._uniformLocations = {};
    }

    /**
     * Makes this program active
     */
    use() {
        this._context.gl.useProgram(this._program);
    }

    /**
     * Correctly deletes this program and child shaders
     */
    dispose() {
        let gl = this._context.gl;

        gl.deleteProgram(this._program);
        this._shaders.forEach(s => s.dispose());
    }

    /**
     * @returns {Context}
     */
    get context() {
        return this._context;
    }

    /**
     * @param {string} name
     */
    getAttributeLocation(name) {
        if (name in this._attributeLocations)
            return this._attributeLocations[name];

        let gl = this._context.gl;
        let location = gl.getAttribLocation(this._program, name);
        if (location === -1)
            throw new Error(`Vertex shader does not have attribute ${name}`);

        this._attributeLocations[name] = location;

        return location;
    }

    getUniformLocation(name) {
        if (name in this._uniformLocations)
            return this._uniformLocations[name];

        let gl = this._context.gl;
        let location = gl.getUniformLocation(this._program, name);

        if (location === null)
            throw new Error(`Shader program does not have uniform ${name}`);

        this._uniformLocations[name] = location;

        return location;
    }
}

/* harmony default export */ __webpack_exports__["a"] = Program;

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";


class Shader {
    /**
     * @param {Context} context
     * @param {WebGLShader} shader
     */
    constructor(context, shader) {
        this._context = context;
        this._shader = shader;
    }

    /**
     * @returns {Context}
     */
    get context(){
        return this._context;
    }

    /**
     * @returns {WebGLShader}
     */
    get shader(){
        return this._shader;
    }

    /**
     * Correctly deletes shader from WebGL context
     */
    dispose(){
        let gl = this._context.gl;
        gl.deleteShader(this._shader);
    }
}

/* harmony default export */ __webpack_exports__["a"] = Shader;

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lib_Context__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__lib_Matrix__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__lib_Quaternion__ = __webpack_require__(2);






let canvas = document.getElementById('glcanvas');

let ctx = new __WEBPACK_IMPORTED_MODULE_0__lib_Context__["a" /* default */](canvas);

let vertexShaderPromise = ctx.createShader('./shaders/vertex.glsl', ctx.gl.VERTEX_SHADER);
let fragmentShaderPromise = ctx.createShader('./shaders/fragment.glsl', ctx.gl.FRAGMENT_SHADER);
let programPromise = ctx.createProgram([vertexShaderPromise, fragmentShaderPromise]);

let vertexData = [
    -1, -1, -1,
    -1, -1, 1,
    -1, 1, -1,
    -1, 1, 1,

    1, -1, -1,
    1, -1, 1,
    1, 1, -1,
    1, 1, 1,


    //axis
    0, 0, 0,
    2, 0, 0,

    0, 0, 0,
    0, 2, 0
];

let colorData = [
    0, 0, 0,
    0, 0, 1,
    0, 1, 0,
    0, 1, 1,

    1, 0, 0,
    1, 0, 1,
    1, 1, 0,
    1, 1, 1,

    1, 1, 1,
    1, 1, 1,

    1, 1, 1,
    1, 1, 1
];

let indices = [
    0, 1, 0, 2, 0, 4,
    1, 3, 1, 5,
    2, 3, 2, 6,
    4, 5, 4, 6,
    7, 6, 7, 5, 7, 3,

    //axis
    8,9,
    10, 11
];

const perspective = __WEBPACK_IMPORTED_MODULE_1__lib_Matrix__["a" /* default */].perspective(60, canvas.width / canvas.height, 0.1, 100.0);

programPromise.then(program => {
    let gl = ctx.gl;

    let translate = __WEBPACK_IMPORTED_MODULE_1__lib_Matrix__["a" /* default */].translate(__WEBPACK_IMPORTED_MODULE_1__lib_Matrix__["a" /* default */].vector([0, 0, -5]));

    let mesh = ctx.createMesh(program);
    mesh.setUniformMatrix('projection', perspective);

    mesh.setBufferData({
        bufferName: 'vertices',
        target: gl.ARRAY_BUFFER,
        data: new Float32Array(vertexData),
        usage: gl.STATIC_DRAW,
        dimensions: 3,
        dataType: gl.FLOAT
    });

    mesh.setBufferData({
        bufferName: 'colors',
        target: gl.ARRAY_BUFFER,
        data: new Float32Array(colorData),
        dimensions: 3,
        dataType: gl.FLOAT,
        usage: gl.STATIC_DRAW
    });

    mesh.setBufferData({
        bufferName: 'indices',
        target: gl.ELEMENT_ARRAY_BUFFER,
        data: new Uint16Array(indices),
        usage: gl.STATIC_DRAW,
        dataType: gl.UNSIGNED_SHORT,
        mode: gl.LINES
    });

    mesh.setAttribute({
        buffer: 'vertices',
        attribute: 'vPosition'
    });

    mesh.setAttribute({
        buffer: 'colors',
        attribute: 'vColor'
    });

    let angle = 0;
    setInterval(function () {
        angle+=0.1;
        let rotation = __WEBPACK_IMPORTED_MODULE_2__lib_Quaternion__["a" /* default */].rotateDegrees(__WEBPACK_IMPORTED_MODULE_1__lib_Matrix__["a" /* default */].vector([0, 1, 0]), angle)
            .mult(__WEBPACK_IMPORTED_MODULE_2__lib_Quaternion__["a" /* default */].rotateDegrees(__WEBPACK_IMPORTED_MODULE_1__lib_Matrix__["a" /* default */].vector([1, 0, 0]), angle * 0.1));
        mesh.setUniformMatrix('modelView', translate.mult(rotation.toMatrix()));
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        mesh.render('indices');
    }, 0);


}).catch(console.log);

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map