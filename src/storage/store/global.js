// src/storage/global.js
const global = {
	route: [],
	isLoading: false,
	auth: {
		accessToken: null,
		authorization: null,
		user: {
			id: null,
			email: null,
			name: null,
			role: null,
		},
	},
	error: {
		show: null,
		message: null,
	},
	fingerprint: null,
	setRoute: () => {},
	setAuth: () => {},
	setError: () => {},
	setFingerprint: () => {},
	setIsLoading: () => {},
};

export default global;
