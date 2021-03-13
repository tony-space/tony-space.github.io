webpackJsonp([0],{

/***/ 3:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__webgl_library_Matrix__ = __webpack_require__(0);




class Lattice {
    /**
     * @param {number} width
     * @param {number} height
     */
    constructor(width, height) {
        this._width = width;
        this._height = height;

        const length = width * height;
        this._data = new Array(length);
        for (let i = 0; i < length; ++i)
            this._data[i] = __WEBPACK_IMPORTED_MODULE_0__webgl_library_Matrix__["a" /* default */].vector([0, 0, 0]);
    }

    /**
     *
     * @param {number} i
     * @param {number} j
     * @return {Matrix}
     */
    get(i, j) {
        if (i >= this._width || j >= this._height)
            throw new RangeError();

        const index = j * this._width + i;
        return this._data[index];
    }

    /**
     * @return {number}
     */
    get width() {
        return this._width;
    }

    /**
     * @return {number}
     */
    get height() {
        return this._height;
    }

    /**
     * @return {number}
     */
    get count() {
        return this._width * this._height;
    }

    /**
     * @param {function} callback
     */
    forEach(callback) {
        for (let i = 0; i < this._width; ++i)
            for (let j = 0; j < this._height; ++j)
                callback(i, j);
    }

    /**
     * @return {Array<number>}
     */
    verticesArray() {
        let result = new Array(this.width * this.height * 3);
        let index = 0;
        this._data.forEach(v => {
            result[index++] = v.getValue(0);
            result[index++] = v.getValue(1);
            result[index++] = v.getValue(2);
        });

        return result;
    }

    /**
     * @return {Uint16Array<number>}
     */
    trianglesArray() {
        let result = [];

        this.forEach((i, j) => {
            if (i === 0 || j === 0) return;

            const current = this.width * j + i;
            const top = this.width * (j - 1) + i;
            const left = this.width * j + i - 1;
            const topLeft = this.width * (j - 1) + i - 1;

            result.push(current, top, topLeft);
            result.push(current, topLeft, left);
        });

        return new Uint16Array(result);
    }

    /**
     * @return {Uint16Array<number>}
     */
    linesArray() {
        let result = [];

        this.forEach((i, j) => {
            if (i === 0 || j === 0) return;

            const current = this.width * j + i;
            const top = this.width * (j - 1) + i;
            const left = this.width * j + i - 1;
            const topLeft = this.width * (j - 1) + i - 1;

            result.push(current, top);
            result.push(top, topLeft);
            result.push(topLeft, left);
            result.push(left, current);
        });

        return new Uint16Array(result);
    }
}

/* harmony default export */ __webpack_exports__["a"] = Lattice;

/***/ }),

/***/ 9:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__webgl_library_Context__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__webgl_library_Matrix__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__webgl_library_Quaternion__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__lattice__ = __webpack_require__(3);








let canvas = document.getElementById('glcanvas');
let ctx = new __WEBPACK_IMPORTED_MODULE_0__webgl_library_Context__["a" /* default */](canvas);

let vertexShaderPromise = ctx.createShader('./shaders/vertex.glsl', ctx.gl.VERTEX_SHADER);
let fragmentShaderPromise = ctx.createShader('./shaders/fragment.glsl', ctx.gl.FRAGMENT_SHADER);


ctx.createProgram([vertexShaderPromise, fragmentShaderPromise]).then(program => {
    let lattice = new __WEBPACK_IMPORTED_MODULE_3__lattice__["a" /* default */](51, 51);
    lattice.forEach((i, j) => {
        let v = lattice.get(i, j);
        let x = (i - 25) * 0.04;
        let y = (j - 25) * 0.04;
        v.setValue(0, x);
        v.setValue(1, y);
    });

    const gl = ctx.gl;
    let mesh = ctx.createMesh(program);
    mesh.loadAttribute3f('aPosition', lattice.verticesArray());
    mesh.setBufferData({
        bufferName: 'triangles',
        target: gl.ELEMENT_ARRAY_BUFFER,
        data: lattice.trianglesArray(),
        usage: gl.STATIC_DRAW,
        dataType: gl.UNSIGNED_SHORT,
        mode: gl.TRIANGLES
    });

    mesh.setBufferData({
        bufferName: 'lines',
        target: gl.ELEMENT_ARRAY_BUFFER,
        data: lattice.linesArray(),
        usage: gl.STATIC_DRAW,
        dataType: gl.UNSIGNED_SHORT,
        mode: gl.LINES
    });

    const perspective = __WEBPACK_IMPORTED_MODULE_1__webgl_library_Matrix__["a" /* default */].perspective(60, canvas.width / canvas.height, 0.001, 100.0);
    mesh.setUniformMatrix('uProjection', perspective);
    return mesh;

}).then(mesh => {
    const gl = ctx.gl;
    mesh.setUniformMatrix('uModel', __WEBPACK_IMPORTED_MODULE_2__webgl_library_Quaternion__["a" /* default */].rotateDegrees(__WEBPACK_IMPORTED_MODULE_1__webgl_library_Matrix__["a" /* default */].vector([1, 0, 0]), -90).toMatrix());

    let translate = __WEBPACK_IMPORTED_MODULE_1__webgl_library_Matrix__["a" /* default */].vector([0, 0, -3]);
    let rotation = __WEBPACK_IMPORTED_MODULE_2__webgl_library_Quaternion__["a" /* default */].rotateRadians(__WEBPACK_IMPORTED_MODULE_1__webgl_library_Matrix__["a" /* default */].vector([0, 0, 0]), 0);

    canvas.addEventListener('mousemove', function (event) {
        const leftMouseButton = event.buttons & 1;
        if (!leftMouseButton) return;

        rotation = __WEBPACK_IMPORTED_MODULE_2__webgl_library_Quaternion__["a" /* default */].rotateDegrees(__WEBPACK_IMPORTED_MODULE_1__webgl_library_Matrix__["a" /* default */].vector([1, 0, 0]), event.clientY)
            .mult(__WEBPACK_IMPORTED_MODULE_2__webgl_library_Quaternion__["a" /* default */].rotateDegrees(__WEBPACK_IMPORTED_MODULE_1__webgl_library_Matrix__["a" /* default */].vector([0, 1, 0]), event.clientX * 0.75));

        render();
    });

    canvas.addEventListener('wheel', function (event) {
        if (event.deltaY === 0) return;

        if (event.deltaY > 0)
            translate.setValue(2, translate.getValue(2) * 1.05);
        else
            translate.setValue(2, translate.getValue(2) / 1.05);

        render();
    });

    let triangles = true;


    document.addEventListener('keypress', function (event) {
        if (event.keyCode === 32)
            triangles = !triangles;

        render();
    });

    function render() {
        mesh.setUniformMatrix('uView', __WEBPACK_IMPORTED_MODULE_1__webgl_library_Matrix__["a" /* default */].translate(translate).mult(rotation.toMatrix()));
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        if (triangles)
            mesh.render('triangles');
        else
            mesh.render('lines');
    }

    render();
});

/***/ })

},[9]);
//# sourceMappingURL=surface.js.map