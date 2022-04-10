<template>
	<div class="highlighted-content" :class="{ active }">
		<slot/>
	</div>
</template>

<script>

	export default {
		props: {
			active: {
				type: Boolean,
				default: false
			}
		}
	}

</script>

<style lang="scss">

	.highlighted-content {
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 10vmin;
		border-radius: 10vmin;
		border: 1vmin solid #da9400;
		font-family: Montserrat Black;
		color: #F5C21B;
		background-color: #103769;
		background: linear-gradient(150deg, rgba(#194f94, 1) 0%, rgba(#03162f, 1) 100%);
		transition-property: border-color, color, background-color, box-shadow, text-shadow, transform;
		transition-timing-function:  cubic-bezier(0.68, -0.55, 0.265, 1.55);
		transition-duration: 0.5s;
		will-change: text-shadow, box-shadow;
		overflow: hidden;

		@keyframes selected {
			from {
				left: 0;
				transform: translateX(-100%);
			}
			to {
				left: 100%;
				transform: translateX(0);
			}
		}

		&::before {
			pointer-events: none;
			z-index: 1;
			content: "";
			position: absolute;
			left: 0;
			top: 0;
			width: 100%;
			height: 100%;
			background: linear-gradient(90deg, rgba(#FFF, 0) 0%, rgba(#FFF, 1) 25%, rgba(#FFF, 1) 75%, rgba(#FFF, 0) 100%);
			transform: translateX(-100%);
			opacity: 0.1;
		}

		h2 {
			margin: 2vmin 4vmin;
			font-style: italic;
			font-size: 3vmin;
			text-transform: uppercase;
		}

		&:hover,
		&.active {
			z-index: 3;
			transform: scale(1.2);
			text-shadow: 0 0 2vmin rgba(#F5C21B, 0.3), 0 0.1vmin 0 #966508, 0 0.2vmin 0 #966508, 0 0.3vmin 0 #966508, 0 0.4vmin 0 #966508, 0 0.5vmin 0 #966508;
			box-shadow: inset 0 0 0.1vmin #03162f, 0 0.1vmin 0 #966508, 0 0.2vmin 0 #966508, 0 0.3vmin 0 #966508, 0 0.4vmin 0 #966508, 0 0.5vmin 0 #966508, 0 0 0.5vmin rgba(#FFF, 0.5);

			&::before {
				animation: selected 1s infinite;
			}
		}

		&.active {
			transform: scale(1);
		}
	}

</style>