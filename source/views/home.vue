<template>
	<main>
		<canvas ref="canvas"></canvas>
		<transition name="fade">
			<div class="main-nav" v-if="!launchedLottery">
				<launcher title="Daily" :lotteries="lotteries.daily" @start="onStart"/>
				<launcher title="Weekly" :lotteries="lotteries.weekly" @start="onStart"/>
				<launcher title="Monthly" :lotteries="lotteries.monthly" @start="onStart"/>
			</div>
		</transition>
		<transition name="fade">
			<div class="launched-nav" v-if="launchedLottery">
				<highlighted-content class="back" @click="onBack">Back</highlighted-content>
				<template v-if="drawStarted">
					<transition name="fade">
						<animated-text v-if="drawingStep === 0" class="winning-prize" :text="launchedLottery.fields.drew ? 'Winning&nbsp;prize' : 'Prizes&nbsp;to&nbsp;be&nbsp;won'"/>
						<animated-text v-else-if="drawingStep === 1" class="winning-number" text="Winning&nbsp;number"/>
						<animated-text v-else class="winner" text="Winner"/>
					</transition>
				</template>
				<transition name="fade">
					<highlighted-content v-if="showDrawResults" class="draw-results" active>
						<p>Congratulation to the owner of the NFT number</p>
						<p class="value">{{ launchedLottery.fields.winning_token }}</p>
						<p>Your wallet</p>
						<p class="value">{{ launchedLottery.fields.winner_address }}</p>
						<p>won</p>
						<p class="value">{{ launchedLottery.fields.prizes[0].winning_prize_name }}.</p>
						<p>Come request your prize!</p>
					</highlighted-content>
				</transition>
			</div>
		</transition>
	</main>
</template>

<script>

	import Threadizer from "@threadizer/core";
	import Launcher from "@/components/launcher.vue";
	import HighlightedContent from "@/components/highlighted-content.vue";
	import AnimatedText from "@/components/animated-text.vue";
	import { prependHost } from "@/components/url.js";
	import { dater } from "@/components/dater.js";

	export default {
		components: {
			Launcher,
			HighlightedContent,
			AnimatedText
		},
		data(){

			return {
				drawStarted: false,
				replayStarted: false,
				drawingStep: 0,
				launchedLottery: null,
				showDrawResults: false
			};

		},
		async setup(){

			await new Promise(resolve => setTimeout(resolve, 100));

			const { data } = await fetch("https://zeroproject.io/zerolottery/api/lotteries").then(response => response.json());

			const { lotteries } = data;

			lotteries.map(( lottery )=>{

				lottery.fields.starting_date = new Date(lottery.fields.starting_date);
				lottery.fields.ending_date = new Date(lottery.fields.ending_date);

			});

			const daily = lotteries.filter(lottery => lottery.fields.lottery_type === "Daily");
			const weekly = lotteries.filter(lottery => lottery.fields.lottery_type === "Weekly");
			const monthly = lotteries.filter(lottery => lottery.fields.lottery_type === "Monthly");

			return {
				lotteries: { daily, weekly, monthly }
			};

		},
		async mounted(){

			this.allowStart = true;

			const supported = this.$refs.canvas.transferControlToOffscreen instanceof Function;

			this.thread = await new Threadizer(prependHost("/webgl.js"), null, !supported);

			const canvas = supported ? this.$refs.canvas.transferControlToOffscreen() : this.$refs.canvas;

			await this.thread.transfer("setup", canvas);

			const resize = ()=>{

				this.thread.transfer("resize", {
					width: window.innerWidth,
					height: window.innerHeight,
					pixelRatio: window.devicePixelRatio
				});

			}

			await this.thread.transfer("load", {
				prizeSelector: prependHost("/models/price-selector.glb"),
				prize1: prependHost("/images/test-1.png"),
				prize2: prependHost("/images/test-2.png"),
				prize3: prependHost("/images/test-3.png"),
				lottery: prependHost("/models/lottery-untextured.glb"),
				ground: prependHost("/models/ground.glb"),
				environment: prependHost("/environments/viewpoint.hdr")
			});

			this.thread.on("winner-draw", ()=>{

				this.drawingStep = 1;

			});

			this.thread.on("winner", ()=>{

				this.drawingStep = 2;
				this.showDrawResults = true;

			});

			window.addEventListener("resize", resize, false);

			resize();

		},
		methods: {
			async onStart( lottery, isReplay ){

				const haveBeenPaid = new Date() < dater("05/09/2022");

				if( this.allowStart && haveBeenPaid ){

					this.allowStart = false;

					this.launchedLottery = lottery;

					if( isReplay ){

						this.replayStarted = true;

						this.showDrawResults = true;

					}
					else {

						this.drawingStep = 0;
						this.showDrawResults = false;

						await this.thread.transfer("launch", lottery.fields);

						this.drawStarted = true;

					}

				}

			},
			async onBack(){

				this.drawStarted = false;
				this.replayStarted = false;
				this.showDrawResults = false;
				this.launchedLottery = null;

				await this.thread.transfer("reset");

				this.allowStart = true;

			}
		}
	};

</script>

<style lang="scss">

	canvas {
		display: block;
		width: 100vw;
		height: 100vh;
	}

	.main-nav {
		z-index: 2;
		display: flex;
		flex-direction: column;
		position: absolute;
		justify-content: center;
		box-sizing: border-box;
		left: 0;
		top: 0;
		padding: 5vw;
		width: 100vw;
		height: 100vh;
		background-color: rgba(#000, 0.7);
		transition: opacity 1s;
	}

	.launcher {
		&:nth-child(1) {
			align-self: flex-start;
		}

		&:nth-child(2) {
			align-self: center;
		}

		&:nth-child(3) {
			align-self: flex-end;
			margin-bottom: 20px;
		}

		&:hover {
			z-index: 3;
		}

		// &:nth-child(1),
		// &:nth-child(2),
		// &:nth-child(3) {

		// 	@media (max-width: 960px) {
		// 		width: 100%;
		// 		align-self: flex-start;
		// 	}
		// }
	}

	.launched-nav {
		position: absolute;
		left: 0;
		top: 0;
		width: 100vw;
		height: 100vh;
		font-family: Montserrat Black;
		text-transform: uppercase;

		.back {
			position: absolute;
			left: 5vmin;
			top: 5vmin;
			padding: 0 30px;
			height: 60px;
			font-size: 2vmin;
			cursor: pointer;
		}

		.winning-prize,
		.winning-number,
		.winner {
			position: absolute;
			left: 50%;
			top: 20vh;
			font-size: 4vmax;
			transform: translateX(-50%);
		}

		.draw-results {
			flex-direction: column;
			box-sizing: border-box;
			position: absolute;
			left: 50%;
			top: 50%;
			padding: 50px;
			width: 80vmin;
			min-width: 450px;
			height: 40vmin;
			min-height: 300px;
			border-radius: 5vmin;
			transform: translate(-50%, -50%);

			.value {
				font-style: italic;
				font-size: 1.3em;
				color: #FFF;
			}
		}
	}

	.fade-enter-active,
	.fade-leave-active {
		transition: opacity .5s;
	}

	.fade-enter,
	.fade-leave-to {
		opacity: 0;
	}

</style>