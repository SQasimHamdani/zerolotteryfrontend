"use strict";
self["webpackHotUpdateResidenceMozart"]("webgl",{

/***/ "./workers/lottery.js":
/*!****************************!*\
  !*** ./workers/lottery.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Lottery)
/* harmony export */ });
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");
/* harmony import */ var _tools_gltf_loader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tools/gltf-loader */ "./workers/tools/gltf-loader.js");
/* harmony import */ var _tools_computeBoundings_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./tools/computeBoundings.js */ "./workers/tools/computeBoundings.js");
/* harmony import */ var _tools_easings_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./tools/easings.js */ "./workers/tools/easings.js");
/* harmony import */ var _tools_texture_generator_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./tools/texture-generator.js */ "./workers/tools/texture-generator.js");
/* eslint-disable */






const TIME_BEFORE_END = 5000;

const COLORS = [
	"#FF2222",
	"#22FF22",
	"#222288",
	"#FFFF22",
	"#00FFFF",
	"#FF00FF"
];

let lotteryIndex = 0;

class Lottery {
	constructor( camera, url ){

		return new Promise(async ( resolve )=>{

			const gltf = await (0,_tools_gltf_loader__WEBPACK_IMPORTED_MODULE_0__.loadGLTF)(url);

			Object.assign(this, {
				camera,
				launched: false,
				ended: false,
				completed: false,
				winningNumber: 0,
				numberToStop: 0,
				endAt: 0,
				onEnd: null,
				selectedBallStart: new three__WEBPACK_IMPORTED_MODULE_4__.Vector3(0, -1.55, 0),
				selectedBallEnd: new three__WEBPACK_IMPORTED_MODULE_4__.Vector3(0, -1.55, 2.75)
			});

			this.model = gltf.scene;

			// Main colors
			const color = COLORS[lotteryIndex++ % COLORS.length];
			const mainMaterial = this.model.getObjectByName("Socle").material;
			mainMaterial.emissiveIntensity = 0;
			mainMaterial.metalness = 0.3;
			mainMaterial.color.set(color);

			// Glass
			const glassMaterial = this.model.getObjectByName("GlassOut").material;
			glassMaterial.metalness = 0.9;
			glassMaterial.opacity = 0.03;
			glassMaterial.transparent = true;

			this.bounceZone = this.model.children.find(({ name })=>(name === "BounceZone"));

			Object.assign(this.bounceZone.material, {
				transparent: true,
				opacity: 0
			});

			this.bounceBoundings = (0,_tools_computeBoundings_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this.bounceZone);

			// Balls
			this.balls = new Array();

			const ballModel = this.model.getObjectByName("Ball");
			const numberModel = ballModel.clone();
			ballModel.add(numberModel);
			numberModel.position.set(0, 0, 0);
			numberModel.scale.set(1, 1, 1);
			numberModel.rotation.setFromVector3(new three__WEBPACK_IMPORTED_MODULE_4__.Vector3(0, 0, 0));
			this.ballModelRotation = ballModel.rotation.clone();
			ballModel.parent.remove(ballModel);

			// const { scale } = this.bounceZone;
			const ballSize = this.bounceBoundings.width / 6.5;

			this.displacment = new three__WEBPACK_IMPORTED_MODULE_4__.Vector3(
				((this.bounceBoundings.width / 2) - (ballSize / 2)),
				((this.bounceBoundings.height / 2) - (ballSize / 2)),
				((this.bounceBoundings.depth / 2) - (ballSize / 2))
			);

			const group = new three__WEBPACK_IMPORTED_MODULE_4__.Group();
			group.position.set(0, 1.8, 0);
			this.model.add(group);

			for( let ballIndex = 0; ballIndex < 10; ballIndex++ ){

				const backgroundColor = COLORS[ballIndex % COLORS.length];

				const mesh = ballModel.clone(true);
				mesh.material = mesh.material.clone();
				mesh.material.emissive.setHex(0x010101);
				mesh.material.map = _tools_texture_generator_js__WEBPACK_IMPORTED_MODULE_3__["default"].generateBall(ballModel.material.map.image, ballIndex, backgroundColor);

				mesh.number = ballIndex;

				mesh.rotationVector = new three__WEBPACK_IMPORTED_MODULE_4__.Vector3();

				group.add(mesh);
				this.balls.push(mesh);

			}

			this.selectedBallProgress = 0;

			resolve(this);

		});

		this.reset();

	}
	get position(){

		return this.model.position;

	}
	get boundings(){

		return (0,_tools_computeBoundings_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this.model);

	}
	launch( winningNumber = 0, callback ){

		this.launched = true;

		this.winningNumber = winningNumber;

		this.endAt = performance.now() + (Math.max(0.25, Math.random()) * TIME_BEFORE_END);

		this.onEnd = callback;

		return this;

	}
	update(){

		for( let mesh of this.balls ){

			mesh.position.add(mesh.direction.clone().divideScalar(8));
			mesh.rotationVector.add(mesh.direction.clone().negate().divideScalar(8));
			mesh.rotation.setFromVector3(mesh.rotationVector);

			const outLeft = mesh.position.x >= this.displacment.x;
			const outRight = mesh.position.x <= -this.displacment.x;
			const outTop = mesh.position.y >= this.displacment.y;
			const outBottom = mesh.position.y <= -this.displacment.y;
			const outFront = mesh.position.z >= this.displacment.z;
			const outBack = mesh.position.z <= -this.displacment.z;

			mesh.direction
				.reflect(new three__WEBPACK_IMPORTED_MODULE_4__.Vector3(outRight - outLeft, 0, 0))
				.reflect(new three__WEBPACK_IMPORTED_MODULE_4__.Vector3(0, outTop - outBottom, 0))
				.reflect(new three__WEBPACK_IMPORTED_MODULE_4__.Vector3(0, 0, outFront - outBack));

			if( this.launched && mesh.number === this.winningNumber ){

				if( performance.now() > this.endAt && outBottom && !this.ended ){

					this.ended = true;

					mesh.direction.set(0, 0, 0);
					mesh.position.copy(this.selectedBallStart);
					mesh.rotation.set(0, 0, 0);
					mesh.rotationVector.set(0, 0, 0);

				} else if( this.ended ){

					this.selectedBallProgress += (1 - this.selectedBallProgress) / 100;
					const easedProgress = _tools_easings_js__WEBPACK_IMPORTED_MODULE_2__.bounce.out(this.selectedBallProgress);

					mesh.position.copy(this.selectedBallStart).lerp(this.selectedBallEnd, easedProgress);
					mesh.rotation.set(easedProgress * Math.PI * 0.8, this.ballModelRotation.y, this.ballModelRotation.z);

					if( this.selectedBallProgress >= 0.9 && !this.completed ){

						this.completed = true;

						this.onEnd();

					}

				}

			}

		}

	}
	reset(){

		Object.assign(this, {
			launched: false,
			ended: false,
			completed: false,
			winningNumber: 0,
			numberToStop: 0
		});

		for( let mesh of this.balls ){

			const randomPosition = new three__WEBPACK_IMPORTED_MODULE_4__.Vector3(Math.random() * 2 - 1, -1, Math.random() * 2 - 1);
			const randomDirection = new three__WEBPACK_IMPORTED_MODULE_4__.Vector3(Math.random() * 2 - 1, 1, Math.random() * 2 - 1).normalize();

			mesh.position.copy(this.displacment).multiply(randomPosition);
			mesh.direction = randomDirection;
			mesh.inertia = Math.random() * 2;

		}

	}
}


/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("97c72f99eb8f5a9df11a")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=webgl.228c078cd9d12fff70d4.hot-update.js.map