export const prependHost = function prependHost( path ){

	return `${ window.location.origin }${ window.location.pathname.replace(/\/$/, "") }/${ path }`;

};
