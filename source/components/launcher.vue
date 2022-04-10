<template>
	<div class="launcher">
		<highlighted-content class="start" :class="{ 'with-replay': oldReplays.length }">
			<h2>{{ title }}</h2>
			<countdown :end-date="currentLottery?.fields.ending_date"/>
			<div class="buttons">
				<button v-if="replays.length" class="launch replay" @click="launch(replays[replays.length - 1])"></button>
				<button v-if="currentLottery" class="launch current" @click="launch(currentLottery)"></button>
			</div>
		</highlighted-content>
		<replay-selector :lotteries="oldReplays" @launch="launch($event)"/>
	</div>
</template>

<script>

	import Countdown from "@/components/countdown.vue";
	import ReplaySelector from "@/components/replay-selector.vue";
	import HighlightedContent from "@/components/highlighted-content.vue";

	export default {
		components: {
			Countdown,
			ReplaySelector,
			HighlightedContent
		},
		props: {
			title: {
				type: String,
				required: true
			},
			lotteries: {
				type: Array,
				required: true
			}
		},
		data(){

			return {
				selectedReplay: 0
			};

		},
		computed: {
			sortedLotteries(){

				return this.lotteries.sort(( lotteryA, lotteryB ) => lotteryB.fields.ending_date - lotteryA.fields.ending_date);

			},
			currentLottery(){

				const now = new Date();

				const sorted = this.sortedLotteries
					.filter(lottery => now > lottery.fields.starting_date && now < lottery.fields.ending_date)
					.sort((lotteryA, lotteryB) => lotteryB.fields.starting_date - lotteryB.fields.starting_date);

				return sorted[0];

			},
			replays(){

				const now = new Date();

				return this.lotteries
					.filter(lottery => now > lottery.fields.ending_date)
					.sort(( lotteryA, lotteryB ) => lotteryA.fields.ending_date - lotteryB.fields.ending_date);

			},
			oldReplays(){

				return this.replays.slice(0, -1);

			}
		},
		methods: {
			launch( lottery ){

				const isReplay = this.oldReplays.includes(lottery);

				if( lottery ){

					this.$emit("start", lottery, isReplay);

				}

			}
		}
	}

</script>

<style lang="scss" scoped>

	.launcher {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin: 2vmin 0;
		height: 12vmin;

		@media (max-width: 960px) {
			width: 100%;
			align-self: flex-start;
		}

		.start {

			&.with-replay {
				margin-right: 4vmin;
			}

			@media (max-width: 960px) {
				width: 100%;
			}

			.buttons {
				flex-grow: 0;
				flex-shrink: 0;
				height: 8vmin;

				.launch {
					display: inline-block;
					cursor: pointer;
					margin: 0 1vmin;
					border-radius: 10vmin;
					width: 8vmin;
					height: 8vmin;
					background-color: #F5C21B;
					transition-property: box-shadow, transform, filter;
					transition-duration: 0.2s;

					&::before {
						pointer-events: none;
						content: "";
						display: block;
						width: 100%;
						height: 100%;
						background-size: 50% auto;
						background-position: center center;
						background-repeat: no-repeat;
						filter: drop-shadow(0 0 0.2vmin #FFF);
					}

					&.current::before {
						background-image: url("@/images/play.svg");
					}

					&.replay::before {
						background-image: url("@/images/replay.svg");
					}
				}
			}

			&:hover {

				.launch {
					box-shadow: 0 0 2vmin rgba(#F5C21B, 0.3), 0 0.1vmin 0 #966508, 0 0.2vmin 0 #966508, 0 0.3vmin 0 #966508, 0 0.4vmin 0 #966508, 0 0.5vmin 0 #966508;
					transform: translateY(-0.5vmin);

					&:hover {
						background: #FFF;
						box-shadow: 0 0 2vmin rgba(#F5C21B, 0.3), 0 0.2vmin 0 #FFF, 0 0.4vmin 0 #FFF, 0 0.6vmin 0 #FFF, 0 0.8vmin 0 #FFF;
						transform: translateY(-0.8vmin);
					}
				}

				&:active {

					.launch:hover {
						box-shadow: 0 0 2vmin rgba(#F5C21B, 0.3);
						transform: none;
					}
				}
			}
		}
	}

</style>