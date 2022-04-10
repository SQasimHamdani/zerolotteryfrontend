import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

export const loadGLTF = function loadGLTF( url ){

	return new Promise(( resolve, reject )=>{

		const loader = new GLTFLoader();

		loader.load(url, resolve, null, reject);

	});

};
