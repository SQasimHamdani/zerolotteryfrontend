import { CylinderGeometry, Mesh, MeshBasicMaterial } from "three";
import { loadGLTF } from "./tools/gltf-loader";
import TextureGenerator from "./tools/texture-generator.js";
import gsap from "gsap";

export default class PrizeSelector {
	constructor(url, pricesUrl){

		this.rotation = { value: 10 };

		return new Promise(async ( resolve )=>{

			const gltf = await loadGLTF(url);

			this.model = gltf.scene;

			const rotorMaterial = new MeshBasicMaterial({ color: 0xFFFFFF });

			this.rotor = new Mesh(new CylinderGeometry(0.78, 0.78, 1.5, 32, 1, true, true), rotorMaterial);
			this.rotor.rotation.set(0, 0, -Math.PI * 0.5);
			this.rotor.position.set(0, 1.81816, 0);
			this.model.add(this.rotor);

			await this.setPrizes(pricesUrl);

			resolve(this);

		});

	}
	get position(){

		return this.model.position;

	}
	async setPrizes( prizes ){

		const map = await TextureGenerator.generatePrice(prizes);

		this.rotor.material.map = map;
		this.rotor.material.needsUpdate = true;

	}
	launch( callback ){

		this.launched = true;

		this.animation = gsap.to(this.rotation, 5, {
			value: 0,
			ease: "power4.out",
			onComplete: callback
		});

		return this;

	}
	update(){

		if( this.launched ){

			this.rotor.rotation.x = this.rotation.value * (Math.PI * 2) - Math.PI * 0.1;

		}
		else {

			this.rotor.rotation.x -= Math.PI * 0.005;

		}

	}
	reset(){

		this.launched = false;

		this.rotation.value = 10;

		this.animation?.kill();

	}
}
