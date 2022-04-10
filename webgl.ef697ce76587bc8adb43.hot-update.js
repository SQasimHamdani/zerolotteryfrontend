"use strict";
self["webpackHotUpdateResidenceMozart"]("webgl",{

/***/ "./workers/webgl.js":
/*!**************************!*\
  !*** ./workers/webgl.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");
/* harmony import */ var _prize_selector_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./prize-selector.js */ "./workers/prize-selector.js");
/* harmony import */ var _lottery_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lottery.js */ "./workers/lottery.js");
/* harmony import */ var _tools_gltf_loader_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./tools/gltf-loader.js */ "./workers/tools/gltf-loader.js");
/* harmony import */ var _tools_hdr_loader_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./tools/hdr-loader.js */ "./workers/tools/hdr-loader.js");






const BACKGROUND_COLOR = 0x9A2D31 + 0x222222;

let renderer = null;
const lotteries = new Array(4);
let prizeSelector = null;
const defaultPrizes = new Array();
let launched = false;
let reseting = false;
let resetCallback = null;

const scene = new three__WEBPACK_IMPORTED_MODULE_4__.Scene();
scene.fog = new three__WEBPACK_IMPORTED_MODULE_4__.Fog(BACKGROUND_COLOR, 15, 35);

const camera = new three__WEBPACK_IMPORTED_MODULE_4__.PerspectiveCamera(45, 1, 1, 100);
camera.position.set(20, 40, 40);
const cameraTargets = {
	position: new three__WEBPACK_IMPORTED_MODULE_4__.Vector3(8, 6, 15),
	lookAt: {
		current: new three__WEBPACK_IMPORTED_MODULE_4__.Vector3(),
		target: new three__WEBPACK_IMPORTED_MODULE_4__.Vector3(8, 0, 0)
	}
};

const imported = new three__WEBPACK_IMPORTED_MODULE_4__.Object3D();
scene.add(imported);

const focusPoint = new three__WEBPACK_IMPORTED_MODULE_4__.Object3D();
imported.add(focusPoint);

let currentLotteryIndex = 0;

const spotLightContainer = new three__WEBPACK_IMPORTED_MODULE_4__.Group();
scene.add(spotLightContainer);

const spotLight = new three__WEBPACK_IMPORTED_MODULE_4__.SpotLight(0xFFFFFF, 20, 0, Math.PI * 0.3, 0.5);
spotLight.position.set(0, 0, 0);
spotLight.target = focusPoint;
spotLight.shadow.mapSize.width = 1024;
spotLight.shadow.mapSize.height = 1024;
spotLight.shadow.camera.near = 1;
spotLight.shadow.camera.far = 20;
spotLight.shadow.camera.radius = 0;
spotLight.shadow.bias = -0.002;
spotLightContainer.add(spotLight);

function render(){

	requestAnimationFrame(render);

	focusPoint.position.lerp(cameraTargets.lookAt.target, 0.02);

	spotLightContainer.position.lerp(lotteries[currentLotteryIndex].position.clone().add(new three__WEBPACK_IMPORTED_MODULE_4__.Vector3(0, 10, 0)), 0.01);
	spotLightContainer.rotation.y += 0.01;

	camera.position.lerp(cameraTargets.position, 0.01);

	camera.lookAt(cameraTargets.lookAt.current.lerp(cameraTargets.lookAt.target, 0.02));

	prizeSelector.update();

	for( let lottery of lotteries ){

		lottery.update();

	}

	renderer.render(scene, camera);

}

async function reset( callback ){

	resetCallback = callback;

	reseting = true;
	launched = false;

	await prizeSelector.setPrizes(defaultPrizes);

	for( let lottery of lotteries ){

		lottery.reset();

	}

	prizeSelector.reset();

	const { height: distance } = lotteries[0].boundings;

	cameraTargets.lookAt.target = new three__WEBPACK_IMPORTED_MODULE_4__.Vector3(8, 0, 0);
	cameraTargets.position.set(8, 0, 0).add(new three__WEBPACK_IMPORTED_MODULE_4__.Vector3(0, distance * 2, distance * 3));

	if( !launched ){

		await completeReset();

	}

}

async function completeReset(){

	reseting = false;

	resetCallback?.();

}

thread.on("setup", ({ detail: canvas, complete })=>{

	renderer = new three__WEBPACK_IMPORTED_MODULE_4__.WebGLRenderer({
		canvas,
		antialias: false,
		alpha: false,
		desynchronized: false,
		powerPreference: "high-performance"
	});

	renderer.setClearColor(BACKGROUND_COLOR);

	renderer.shadowMap.enabled = true;
	renderer.shadowMap.type = three__WEBPACK_IMPORTED_MODULE_4__.VSMShadowMap;

	Object.assign(renderer, {
		physicallyCorrectLights: true,
		outputEncoding: three__WEBPACK_IMPORTED_MODULE_4__.sRGBEncoding,
		toneMapping: three__WEBPACK_IMPORTED_MODULE_4__.ACESFilmicToneMapping,
		toneMappingExposure: 1
	});

	complete();

});

thread.on("resize", ({ detail: screen, complete })=>{

	renderer.setSize(screen.width, screen.height, false);
	renderer.setPixelRatio(screen.pixelRatio);

	camera.aspect = screen.width / screen.height;
	camera.updateProjectionMatrix();

	complete();

});

thread.on("load", async ({ detail: urls, complete })=>{

	defaultPrizes.push(urls.prize1, urls.prize2, urls.prize3);

	scene.environment = await (0,_tools_hdr_loader_js__WEBPACK_IMPORTED_MODULE_3__.loadHDR)(urls.environment);

	prizeSelector = await new _prize_selector_js__WEBPACK_IMPORTED_MODULE_0__["default"](urls.prizeSelector, defaultPrizes);
	prizeSelector.position.setX(0);
	imported.add(prizeSelector.model);

	for( let index = 0, length = lotteries.length; index < length; index++ ){

		const lottery = await new _lottery_js__WEBPACK_IMPORTED_MODULE_1__["default"](camera, urls.lottery);

		lottery.position.setX((index + 1) * 4);

		imported.add(lottery.model);

		lotteries[index] = lottery;

	}

	await reset();

	const ground = await (0,_tools_gltf_loader_js__WEBPACK_IMPORTED_MODULE_2__.loadGLTF)(urls.ground);
	ground.scene.children[0].material.map.repeat.set(50, 50);
	ground.scene.children[0].material.roughnessMap.repeat.set(50, 50);
	ground.scene.children[0].material.normalMap.repeat.set(50, 50);
	ground.scene.position.set(0, -0.2, 0);
	imported.add(ground.scene);

	scene.traverse(( child )=>{

		if( child.isMesh ){
	
			child.castShadow = !child.material.transparent && child.material.opacity === 1;
			child.receiveShadow = true;

		}
		else if( child.isLight ){

			child.castShadow = true;

		}

	});

	camera.lookAt(scene.position);

	requestAnimationFrame(render);

	complete();

});

thread.on("launch", async ({ detail: lottery, complete })=>{

	if( !launched ){

		launched = true;

		const { drew, winning_token, prizes: prizesInfos } = lottery;

		const prizes = new Array();

		for( let { winning_prize_image } of prizesInfos ){

			prizes.push("https://" + winning_prize_image);

		}

		await prizeSelector.setPrizes(prizes);

		complete(true);

		if( reseting )
			return completeReset();

		const { height: distance } = lotteries[0].boundings;

		cameraTargets.lookAt.target = prizeSelector.position.clone().add(new three__WEBPACK_IMPORTED_MODULE_4__.Vector3(0, 1, 0));
		cameraTargets.position.copy(prizeSelector.position).add(new three__WEBPACK_IMPORTED_MODULE_4__.Vector3(0, distance * 1, distance * 2));

		if( drew ){

			await new Promise(resolve => prizeSelector.launch(resolve));

			if( reseting )
				return completeReset();

			self.transfer("winner-draw");

			const numbers = winning_token.toString().padStart(4, "0").split("").map(string => parseInt(string, 10));

			for( let index = 0; index < lotteries.length; index++ ){

				currentLotteryIndex = index;

				const lottery = lotteries[index];

				cameraTargets.lookAt.target = lottery.position.clone().add(new three__WEBPACK_IMPORTED_MODULE_4__.Vector3(0, 1.5, 0));
				cameraTargets.position.copy(lottery.position).add(new three__WEBPACK_IMPORTED_MODULE_4__.Vector3(0, distance * 1, distance * 2));

				await new Promise(resolve => lottery.launch(numbers[index], resolve));

				if( reseting )
					return completeReset();

			}

			self.transfer("winner");

			cameraTargets.lookAt.target = new three__WEBPACK_IMPORTED_MODULE_4__.Vector3(8, 0, 0);
			cameraTargets.position.set(8, 0, 0).add(new three__WEBPACK_IMPORTED_MODULE_4__.Vector3(0, distance * 2, distance * 3));

		}

	}
	else {

		complete(false);

	}

});

thread.on("reset", async ({ complete })=>{

	await reset(complete);

});


/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("ba881d94b26c7f0e978c")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=webgl.ef697ce76587bc8adb43.hot-update.js.map