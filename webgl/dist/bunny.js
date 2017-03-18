webpackJsonp([1],{

/***/ 4:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Matrix__ = __webpack_require__(0);




class ObjFile {
    /**
     *
     * @param {string} text obj file content
     */
    constructor(text) {
        let lines = text.split('\n');
        this._vertices = [];
        this._triangles = [];

        lines.forEach(line => {
            let tokens = line.split(' ');
            if (tokens.length != 4)
                return;

            switch (tokens[0]) {
                case 'v':
                    let x = parseFloat(tokens[1]);
                    let y = parseFloat(tokens[2]);
                    let z = parseFloat(tokens[3]);

                    this._vertices.push([x, y, z]);
                    break;

                case 'f':
                    let a = parseInt(tokens[1]) - 1;
                    let b = parseInt(tokens[2]) - 1;
                    let c = parseInt(tokens[3]) - 1;

                    this._triangles.push([a, b, c]);
                    break;
            }
        });
    }

    /**
     * @returns {Array<Matrix>}
     */
    getNormalsArray() {
        let verticesTriangles = new Array(this._vertices.length);
        let result = [];

        this._triangles.forEach((triangle, tIndex) =>
            triangle.forEach(vIndex => {
                if (verticesTriangles[vIndex] === undefined)
                    verticesTriangles[vIndex] = [];

                verticesTriangles[vIndex].push(tIndex);
            }));


        verticesTriangles.forEach(triangles => {
            let normal = __WEBPACK_IMPORTED_MODULE_0__Matrix__["a" /* default */].vector([0, 0, 0]);

            triangles.forEach(tIndex => {
                let triangle = this._triangles[tIndex];

                let a = __WEBPACK_IMPORTED_MODULE_0__Matrix__["a" /* default */].vector(this._vertices[triangle[0]]);
                let b = __WEBPACK_IMPORTED_MODULE_0__Matrix__["a" /* default */].vector(this._vertices[triangle[1]]);
                let c = __WEBPACK_IMPORTED_MODULE_0__Matrix__["a" /* default */].vector(this._vertices[triangle[2]]);

                let cross = b.sub(a).cross(c.sub(a));
                normal = cross.mult(1 / cross.length()).add(normal);
            });

            normal = normal.mult(1 / normal.length());
            result.push(normal);
        });

        return result;
    }

    /**
     * @returns {Array<Matrix>}
     */
    getVerticesArray() {
        return this._vertices.map(v => __WEBPACK_IMPORTED_MODULE_0__Matrix__["a" /* default */].vector(v));
    }

    /**
     * @returns {Array<number>}
     */
    getTrianglesArray() {
        let result = [];
        this._triangles.forEach(face => result = result.concat(face));
        return result;
    }

    /**
     * @returns {Array<number>}
     */
    getLinesArray() {
        let result = [];
        this._triangles.forEach(face => {
            result.push(face[0]);
            result.push(face[1]);

            result.push(face[1]);
            result.push(face[2]);

            result.push(face[2]);
            result.push(face[0]);
        });

        return result;
    }

    static loadAsync(url) {
        return fetch(url)
            .then(response => response.text())
            .then(text => new ObjFile(text));
    }
}

/* harmony default export */ __webpack_exports__["a"] = ObjFile;

/***/ }),

/***/ 8:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__webgl_library_Context__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__webgl_library_Matrix__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__webgl_library_Quaternion__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__webgl_library_ObjFile__ = __webpack_require__(4);







let canvas = document.getElementById('glcanvas');
let ctx = new __WEBPACK_IMPORTED_MODULE_0__webgl_library_Context__["a" /* default */](canvas);

let objPromise = __WEBPACK_IMPORTED_MODULE_3__webgl_library_ObjFile__["a" /* default */].loadAsync('./obj/bunny.obj');
let vertexShaderPromise = ctx.createShader('./shaders/vertex.glsl', ctx.gl.VERTEX_SHADER);
let fragmentShaderPromise = ctx.createShader('./shaders/fragment.glsl', ctx.gl.FRAGMENT_SHADER);
let programPromise = ctx.createProgram([vertexShaderPromise, fragmentShaderPromise]);

Promise.all([objPromise, programPromise]).then(results => {
    let objFile = results[0];
    let program = results[1];

    const gl = ctx.gl;
    gl.enable(gl.CULL_FACE);
    let mesh = ctx.createMesh(program);

    mesh.loadAttribute3f('aPosition', objFile.getVerticesArray().reduce((r, v) => r.concat([v.getValue(0), v.getValue(1), v.getValue(2)]), []));
    mesh.loadAttribute3f('aNormal', objFile.getNormalsArray().reduce((r, v) => r.concat([v.getValue(0), v.getValue(1), v.getValue(2)]), []));

    mesh.setBufferData({
        bufferName: 'triangles',
        target: gl.ELEMENT_ARRAY_BUFFER,
        data: new Uint16Array(objFile.getTrianglesArray()),
        usage: gl.STATIC_DRAW,
        dataType: gl.UNSIGNED_SHORT,
        mode: gl.TRIANGLES
    });

    mesh.setBufferData({
        bufferName: 'lines',
        target: gl.ELEMENT_ARRAY_BUFFER,
        data: new Uint16Array(objFile.getLinesArray()),
        usage: gl.STATIC_DRAW,
        dataType: gl.UNSIGNED_SHORT,
        mode: gl.LINES
    });

    const perspective = __WEBPACK_IMPORTED_MODULE_1__webgl_library_Matrix__["a" /* default */].perspective(60, canvas.width / canvas.height, 0.001, 100.0);
    mesh.setUniformMatrix('uProjection', perspective);
    return mesh;
}).then(mesh => {
    const gl = ctx.gl;
    let translate = __WEBPACK_IMPORTED_MODULE_1__webgl_library_Matrix__["a" /* default */].vector([0, 0, -0.25]);
    let rotation = __WEBPACK_IMPORTED_MODULE_2__webgl_library_Quaternion__["a" /* default */].rotateRadians(__WEBPACK_IMPORTED_MODULE_1__webgl_library_Matrix__["a" /* default */].vector([0, 0, 0]), 0);
    render();

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

    function render() {
        mesh.setUniformMatrix('uModel', __WEBPACK_IMPORTED_MODULE_1__webgl_library_Matrix__["a" /* default */].translate(__WEBPACK_IMPORTED_MODULE_1__webgl_library_Matrix__["a" /* default */].vector([0, -0.075, 0])));
        mesh.setUniformMatrix('uView', __WEBPACK_IMPORTED_MODULE_1__webgl_library_Matrix__["a" /* default */].translate(translate).mult(rotation.toMatrix()));
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        mesh.render('triangles');
        //mesh.render('lines');
    }
});

/***/ })

},[8]);
//# sourceMappingURL=bunny.js.map