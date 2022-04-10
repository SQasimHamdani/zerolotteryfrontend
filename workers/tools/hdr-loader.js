import { EquirectangularReflectionMapping } from "three";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";

export const loadHDR = function loadHDR( url ){

	return new Promise(( resolve, reject )=>{

		const loader = new RGBELoader();

		loader.load(url, ( texture )=>{

			texture.mapping = EquirectangularReflectionMapping;

			resolve(texture);

		}, null, reject);

	});

};
