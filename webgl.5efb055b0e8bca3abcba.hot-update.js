"use strict";
self["webpackHotUpdateResidenceMozart"]("webgl",{

/***/ "./workers/tools/texture-generator.js":
/*!********************************************!*\
  !*** ./workers/tools/texture-generator.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ TextureGenerator)
/* harmony export */ });
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");


const SIZE = 1024;
const canvas = self.OffscreenCanvas ? new OffscreenCanvas(SIZE, SIZE) : document.createElement("canvas");

Object.assign(canvas, {
	width: SIZE,
	height: SIZE
});

const context = canvas.getContext("2d");

class TextureGenerator {
	static toImage(){

		if( self instanceof self.WorkerGlobalScope ){

			return canvas.transferToImageBitmap();

		}
		else {

			console.log("safari");

		}

	}
	static async generatePrice([ imageAUrl, imageBUrl, imageCUrl ]){

		const third = SIZE / 3;

		context.save();
		const imageC = await TextureGenerator.loadImage(imageCUrl);
		context.fillStyle = "#FFFFFF";
		context.fillRect(0, 0, third, SIZE);
		context.fillStyle = "#555555";
		context.fillRect(third * 0.2, SIZE * 0.2, third * 0.6, SIZE * 0.6);
		context.translate(third * 0.2, SIZE * 0.2);
		context.rotate(Math.PI * 0.5);
		context.scale(1, -1);
		context.drawImage(imageC, 0, 0, SIZE * 0.6, third * 0.6);
		context.restore();

		context.save();
		const imageB = await TextureGenerator.loadImage(imageBUrl);
		context.fillStyle = "#FFFFFF";
		context.fillRect(third, 0, third, SIZE);
		context.fillStyle = "#555555";
		context.fillRect(third + (third * 0.2), SIZE * 0.2, third * 0.6, SIZE * 0.6);
		context.translate(third + (third * 0.2), SIZE * 0.2);
		context.rotate(Math.PI * 0.5);
		context.scale(1, -1);
		context.drawImage(imageB, 0, 0, SIZE * 0.6, third * 0.6);
		context.restore();

		context.save();
		const imageA = await TextureGenerator.loadImage(imageAUrl);
		context.fillStyle = "#FFFFFF";
		context.fillRect(third * 2, 0, third, SIZE);
		context.fillStyle = "#555555";
		context.fillRect((third * 2) + (third * 0.2), SIZE * 0.2, third * 0.6, SIZE * 0.6);
		context.translate((third * 2) + (third * 0.2), SIZE * 0.2);
		context.rotate(Math.PI * 0.5);
		context.scale(1, -1);
		context.drawImage(imageA, 0, 0, SIZE * 0.6, third * 0.6);
		context.restore();

		const image = TextureGenerator.toImage();

		const texture = new three__WEBPACK_IMPORTED_MODULE_0__.Texture(image, three__WEBPACK_IMPORTED_MODULE_0__.UVMapping, three__WEBPACK_IMPORTED_MODULE_0__.ClampToEdgeWrapping, three__WEBPACK_IMPORTED_MODULE_0__.ClampToEdgeWrapping, three__WEBPACK_IMPORTED_MODULE_0__.LinearFilter, three__WEBPACK_IMPORTED_MODULE_0__.LinearMipmapLinearFilter, three__WEBPACK_IMPORTED_MODULE_0__.RGBAFormat, three__WEBPACK_IMPORTED_MODULE_0__.UnsignedByteType, 1, three__WEBPACK_IMPORTED_MODULE_0__.LinearEncoding);
		texture.needsUpdate = true;

		return texture;

	}
	static generateBall( baseImage, number = 0, color = "#000" ){

		context.save();

		context.fillStyle = color;
		context.fillRect(0, 0, SIZE, SIZE);

		context.drawImage(baseImage, 0, 0, SIZE, SIZE);

		context.font = "bold 150px Helvetica";
		context.fillStyle = "#000000";
		context.textAlign = "center";
		context.textBaseline = "middle";
		context.translate(SIZE / 2, SIZE / 2);
		context.scale(0.5, 1);
		context.fillText(number, 0, 0);

		context.restore();

		const image = TextureGenerator.toImage();

		const texture = new three__WEBPACK_IMPORTED_MODULE_0__.Texture(image, three__WEBPACK_IMPORTED_MODULE_0__.UVMapping, three__WEBPACK_IMPORTED_MODULE_0__.ClampToEdgeWrapping, three__WEBPACK_IMPORTED_MODULE_0__.ClampToEdgeWrapping, three__WEBPACK_IMPORTED_MODULE_0__.LinearFilter, three__WEBPACK_IMPORTED_MODULE_0__.LinearMipmapLinearFilter, three__WEBPACK_IMPORTED_MODULE_0__.RGBAFormat, three__WEBPACK_IMPORTED_MODULE_0__.UnsignedByteType, 1, three__WEBPACK_IMPORTED_MODULE_0__.LinearEncoding);
		texture.needsUpdate = true;

		return texture;

	}
	static async loadImage( url ){

		if( createImageBitmap instanceof Function ){

			return fetch(url).then(response => response.blob()).then(( blob )=>{

				return createImageBitmap(blob, {
					premultiplyAlpha: "none",
					colorSpaceConversion: "none"
				});

			});

		}
		else {

			return new Promise(( resolve )=>{

				const image = new Image();

				function onLoad(){

					image.removeEventListener("load", onLoad);

					resolve(image);

				};

				image.addEventListener("load", onLoad);

				image.src = url;

			});

		}

	}
}


/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("81c6def4a091c1df905d")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=webgl.5efb055b0e8bca3abcba.hot-update.js.map