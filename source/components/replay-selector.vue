<template>
	<div class="replays" v-if="currentReplay">
		<button v-if="lotteries[this.selected - 1]" class="arrow previous" @click="previous"></button>
		<div class="date">
			<p>{{ currentReplay.month }}</p>
			<p>{{ currentReplay.day }}</p>
		</div>
		<button v-if="lotteries[this.selected + 1]" class="arrow next" @click="next"></button>
		<button class="launch" @click="launch"></button>
	</div>
</template>

<script>

	const MONTHS = ["january", "february", "march", "april", "may", "june", "jully", "august", "september", "october", "november", "december"];
	const DAYS = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];

	export default {
		props: {
			lotteries: {
				type: Array,
				required: true
			}
		},
		data(){

			return {
				selected: this.lotteries.length - 1
			};

		},
		computed: {
			currentReplay(){

				if( this.lotteries.length ){

					const { starting_date } = this.lotteries[this.selected].fields;
					const month = MONTHS[starting_date.getMonth()];
					let day = starting_date.getDate();

					if( day === 1 ){

						day += "st";

					}
					else if( day === 2 ){

						day += "nd";

					}
					else if( day === 3 ){

						day += "rd";

					}
					else {

						day += "th";

					}

					return {
						month,
						day,
						lottery: this.lotteries[this.selected]
					};

				}
				else {

					return null;

				}

			}
		},
		methods: {
			previous(){

				this.selected = Math.max(0, this.selected - 1);

			},
			next(){

				this.selected = Math.min(this.lotteries.length - 1, this.selected + 1);

			},
			launch(){

				this.$emit("launch", this.lotteries[this.selected]);

			}
		}
	}

</script>

<style lang="scss" scoped>

	.replays {
		display: flex;
		align-items: center;
		justify-content: space-between;
		flex-grow: 0;
		flex-shrink: 0;
		width: 14vmin;
		height: 10vmin;
		border-radius: 10vmin;
		border: 1vmin solid #da9400;
		font-family: Montserrat Black;
		color: #F5C21B;
		text-transform: uppercase;
		text-align: center;
		background-color: #103769;
		background: linear-gradient(150deg, rgba(#194f94, 1) 0%, rgba(#03162f, 1) 100%);
		transition-property: border-color, color, background-color, text-shadow, box-shadow, transform;
		transition-timing-function:  cubic-bezier(0.68, -0.55, 0.265, 1.55);
		transition-duration: 0.5s;

		.date {
			pointer-events: none;
			width: 100%;
			font-size: 1.6vmin;
		}

		.arrow,
		.launch {
			cursor: pointer;
			z-index: 2;
			position: absolute;
			width: 4vmin;
			height: 4vmin;
			border-radius: 2vmin;
			background-color: transparent;
			background-color: #da9400;
			opacity: 0;
			transition-property: opacity;
			transition-duration: 0.3s;

			&::before {
				content: "⇧";
				position: absolute;
				display: block;
				top: 50%;
				left: 50%;
				font-size: 2vmin;
				color: #000;
				transform: translate(-50%, -50%);
			}

			&.previous {
				left: -2.5vmin;
				transform: rotateZ(-90deg);
			}

			&.next {
				right: -2.5vmin;
				transform: rotateZ(90deg);
			}
		}

		.launch {
			opacity: 1;
			top: 100%;
			left: 50%;
			background-color: #103769;
			transform: translate(-50%, -25%);

			&::before {
				content: "";
				display: block;
				width: 100%;
				height: 100%;
				background-image: url("@/images/play.svg");
				background-size: 50% auto;
				background-position: center center;
				background-repeat: no-repeat;
				filter: invert(100%);
			}
		}

		&:hover {
			transform: scale(1.2);
			text-shadow: 0 0 2vmin rgba(#F5C21B, 0.3), 0 0.1vmin 0 #966508, 0 0.2vmin 0 #966508, 0 0.3vmin 0 #966508, 0 0.4vmin 0 #966508, 0 0.5vmin 0 #966508;
			box-shadow: inset 0 0 1vmin #03162f, 0 0.1vmin 0 #966508, 0 0.2vmin 0 #966508, 0 0.3vmin 0 #966508, 0 0.4vmin 0 #966508, 0 0.5vmin 0 #966508, 0 0 5vmin rgba(#FFF, 0.5);

			.arrow,
			.launch {
				opacity: 1;

				&:hover {
					background-color: #FFF;
					box-shadow: 0 0 2vmin #FFF;
				}
			}

			.launch:hover::before {
				filter: none;
			}
		}
	}

</style>