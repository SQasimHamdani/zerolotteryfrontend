import { Texture, RGBFormat, RGBAFormat, TextureLoader } from "three";

export const loadTexture = function loadTexture( path ){

	if( typeof WorkerGlobalScope !== "undefined" && self instanceof WorkerGlobalScope ){

		return fetch(path).then(response => response.blob()).then(( blob )=>{

			return createImageBitmap(blob).then(( image )=>{
				const isJPEG = /\.jpe?g(\\?|$)/i.test(path) || /^data\:image\/jpeg/i.test(path);
				const texture = new Texture(image, undefined, undefined, undefined, undefined, undefined, isJPEG ? RGBFormat : RGBAFormat, undefined, undefined, undefined);
				texture.repeat.set(1, -1);
				texture.offset.set(0, 1);
				texture.needsUpdate = true;
				return texture;
			});

		});

	}
	else {

		return new Promise(( resolve, reject )=>{
			const loader = new TextureLoader();
			loader.load(path, resolve, undefined, reject);
		});

	}
};
