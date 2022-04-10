<template>
	<div class="countdown">
		<span class="count">{{ days }}</span>
		<span class="unit">d</span>
		<span class="count">{{ hours }}</span>
		<span class="unit">h</span>
		<span class="count">{{ minutes }}</span>
		<span class="unit">m</span>
		<span class="count">{{ seconds }}</span>
		<span class="unit">s</span>
	</div>
</template>

<script>

	export default {
		props: {
			endDate: {
				type: Object,
				required: false,
				default: null
			}
		},
		data(){

			return {
				days: '00',
				hours: '00',
				minutes: '00',
				seconds: '00'
			};

		},
		mounted(){

			if( this.endDate ){

				this.updateCountdown();

				this.interval = setInterval(this.updateCountdown, 1000);

			}

		},
		beforeDestroy(){

			clearInterval(this.interval);

		},
		methods: {
			updateCountdown(){

				let delta = Math.max(0, this.endDate - new Date()) / 1000;

				const days = Math.floor(delta / 86400);
				delta -= days * 86400;

				const hours = Math.floor(delta / 3600) % 24;
				delta -= hours * 3600;

				const minutes = Math.floor(delta / 60) % 60;
				delta -= minutes * 60;

				const seconds = Math.floor(delta % 60);

				Object.assign(this, {
					days: `${ days }`.padStart(2, 0),
					hours: `${ hours }`.padStart(2, 0),
					minutes: `${ minutes }`.padStart(2, 0),
					seconds: `${ seconds }`.padStart(2, 0)
				});

			}
		}
	}

</script>

<style lang="scss">

	.countdown {
		width: 15vmin;
		margin: 2vmin 4vmin 2vmin 0;
		white-space: nowrap;
		pointer-events: none;

		.count {
			font-size: 2vmin;
			font-weight: bold;
		}

		.unit {
			margin: 0 0.5vmin 0 0.1vmin;
			font-size: 1.5vmin;
			text-transform: uppercase;
			opacity: 0.5;
		}
	}

</style>