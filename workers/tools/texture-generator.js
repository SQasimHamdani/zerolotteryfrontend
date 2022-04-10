import { Texture, UVMapping, ClampToEdgeWrapping, LinearFilter, LinearMipmapLinearFilter, RGBAFormat, UnsignedByteType, LinearEncoding } from "three";

const SIZE = 1024;
const canvas = self.OffscreenCanvas ? new OffscreenCanvas(SIZE, SIZE) : document.createElement("canvas");

Object.assign(canvas, {
	width: SIZE,
	height: SIZE
});

const context = canvas.getContext("2d");

export default class TextureGenerator {
	static toImage(){

		if( typeof WorkerGlobalScope !== "undefined" && self instanceof WorkerGlobalScope ){

			return canvas.transferToImageBitmap();

		}
		else {

			const image = new Image();

			image.src = canvas.toDataURL("image/png");

			return image;

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

		const texture = new Texture(image, UVMapping, ClampToEdgeWrapping, ClampToEdgeWrapping, LinearFilter, LinearMipmapLinearFilter, RGBAFormat, UnsignedByteType, 1, LinearEncoding);
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

		const texture = new Texture(image, UVMapping, ClampToEdgeWrapping, ClampToEdgeWrapping, LinearFilter, LinearMipmapLinearFilter, RGBAFormat, UnsignedByteType, 1, LinearEncoding);
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
