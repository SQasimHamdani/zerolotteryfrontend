<template>
	<suspense>
		<home/>
	</suspense>
</template>

<script>

	import Home from "@/views/home.vue";

	export default {
		components: { Home }
	};

</script>

<style lang="scss">

	* {
		position: relative;
		margin: 0;
		padding: 0;
		border: 0;
		outline: none;
		appearance: none;
	}

	html {
		font-family: sans-serif;
		color: #FFF;
		background-color: #1D1D22;

		&::before {
			content: "";
			z-index: 2;
			display: block;
			position: absolute;
			left: 0;
			top: 0;
			width: 100vw;
			height: 100vh;
			pointer-events: none;
			background: radial-gradient(circle, rgba(#000, 0) 50%, rgba(#000, 0.8) 100%);
			opacity: 0.5;
		}
	}

</style>