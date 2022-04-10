<template>
	<p class="animated-text">
		<div v-for="(letter, index) in text" :key="`${ text }-${ letter }${ index }`" class="letter">
			<span class="spacer">{{ letter }}</span>
			<span class="animated" :style="`animation-delay: ${ -index / text.length }s`">{{ letter }}</span>
		</div>
	</p>
</template>

<script>

	export default {
		props: {
			text: {
				type: String,
				required: true
			}
		}
	}

</script>

<style lang="scss">

	@keyframes bouncing {
		0% {
			transform: translateY(-20%);
		}
		50% {
			transform: translateY(20%);
		}
		100% {
			transform: translateY(-20%);
		}
	}

	.animated-text {
		white-space: nowrap;

		.letter {
			display: inline-block;

			.spacer {
				opacity: 0;
			}

			.animated {
				position: absolute;
				left: 0;
				top: 0;
				color: #194f94;
				animation: 2s bouncing 0s ease-in-out infinite;
				text-shadow: 0 -0.5vmin 0 #F5C21B;

				@supports (-webkit-background-clip: text){
					background: linear-gradient(150deg, rgba(#194f94, 1) 0%, rgba(#03162f, 1) 100%);
					-webkit-background-clip: text;
					-webkit-text-fill-color: transparent;
				}
			}
		}
	}

</style>