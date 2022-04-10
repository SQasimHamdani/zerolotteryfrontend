export const bounce = {
	out: function( progress ){

		const n1 = 7.5625;
		const d1 = 2.75;

		if( progress < 1 / d1 ){

			return n1 * progress * progress;

		}
		else if( progress < 2 / d1 ){

			return n1 * (progress -= 1.5 / d1) * progress + 0.75;

		}
		else if( progress < 2.5 / d1 ){

			return n1 * (progress -= 2.25 / d1) * progress + 0.9375;

		}
		else {

			return n1 * (progress -= 2.625 / d1) * progress + 0.984375;

		}

	}
};
