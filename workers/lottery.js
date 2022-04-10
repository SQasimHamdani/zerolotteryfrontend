/* eslint-disable */
import { Vector3, Group, MeshStandardMaterial } from "three";
import { loadGLTF } from "./tools/gltf-loader";
import computeBoundings from "./tools/computeBoundings.js";
import { bounce } from "./tools/easings.js";
import TextureGenerator from "./tools/texture-generator.js";

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

export default class Lottery {
	constructor( camera, url ){

		return new Promise(async ( resolve )=>{

			const gltf = await loadGLTF(url);

			Object.assign(this, {
				camera,
				launched: false,
				ended: false,
				completed: false,
				winningNumber: 0,
				numberToStop: 0,
				endAt: 0,
				onEnd: null,
				selectedBallStart: new Vector3(0, -1.55, 0),
				selectedBallEnd: new Vector3(0, -1.55, 2.75)
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

			this.bounceBoundings = computeBoundings(this.bounceZone);

			// Balls
			this.balls = new Array();

			const ballModel = this.model.getObjectByName("Ball");
			const numberModel = ballModel.clone();
			ballModel.add(numberModel);
			numberModel.position.set(0, 0, 0);
			numberModel.scale.set(1, 1, 1);
			numberModel.rotation.setFromVector3(new Vector3(0, 0, 0));
			this.ballModelRotation = ballModel.rotation.clone();
			ballModel.parent.remove(ballModel);

			// const { scale } = this.bounceZone;
			const ballSize = this.bounceBoundings.width / 6.5;

			this.displacment = new Vector3(
				((this.bounceBoundings.width / 2) - (ballSize / 2)),
				((this.bounceBoundings.height / 2) - (ballSize / 2)),
				((this.bounceBoundings.depth / 2) - (ballSize / 2))
			);

			const group = new Group();
			group.position.set(0, 1.8, 0);
			this.model.add(group);

			for( let ballIndex = 0; ballIndex < 10; ballIndex++ ){

				const backgroundColor = COLORS[ballIndex % COLORS.length];

				const mesh = ballModel.clone(true);
				mesh.material = mesh.material.clone();
				mesh.material.emissive.setHex(0x010101);
				mesh.material.map = TextureGenerator.generateBall(ballModel.material.map.image, ballIndex, backgroundColor);

				mesh.number = ballIndex;

				mesh.rotationVector = new Vector3();

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

		return computeBoundings(this.model);

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
				.reflect(new Vector3(outRight - outLeft, 0, 0))
				.reflect(new Vector3(0, outTop - outBottom, 0))
				.reflect(new Vector3(0, 0, outFront - outBack));

			if( this.launched && mesh.number === this.winningNumber ){

				if( performance.now() > this.endAt && outBottom && !this.ended ){

					this.ended = true;

					mesh.direction.set(0, 0, 0);
					mesh.position.copy(this.selectedBallStart);
					mesh.rotation.set(0, 0, 0);
					mesh.rotationVector.set(0, 0, 0);

				} else if( this.ended ){

					this.selectedBallProgress += (1 - this.selectedBallProgress) / 100;
					const easedProgress = bounce.out(this.selectedBallProgress);

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

			const randomPosition = new Vector3(Math.random() * 2 - 1, -1, Math.random() * 2 - 1);
			const randomDirection = new Vector3(Math.random() * 2 - 1, 1, Math.random() * 2 - 1).normalize();

			mesh.position.copy(this.displacment).multiply(randomPosition);
			mesh.direction = randomDirection;
			mesh.inertia = Math.random() * 2;

		}

	}
}
