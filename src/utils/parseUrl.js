const parseUrl = (key) => {
	if (typeof window !== "undefined") {
		return new URLSearchParams(window.location.search).get(key);
	}

	return null;
};

const getUrlParams = () => {
	const params = window.location.search
		.substring(1)
		.split("&")
		.filter(Boolean);
	if (!params?.length) return null;

	const payload = {};
	for (let param of params) {
		const [key, value] = param.split("=");
		payload[key] = value;
	}

	return payload;
};

const getLocation = (key) => {
	if (typeof window !== "undefined") {
		return window.location[key] || null;
	}

	return null;
};

export { parseUrl, getLocation, getUrlParams };
