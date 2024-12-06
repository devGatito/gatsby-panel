

export const format = (n) => {
	let result = "";
	let currency = new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
	});

	if (n > 0) {
		result = currency.format(n);
		// result = currency.replace(".00", "");
	}

	result = result.replace(/[$]/g, "$ ");
	return result;
};

export const formatNumber = (n) => {
	return format(n).replace(/[$]/g, "");
};

export const StringToNumber = (n) => {
	return n.replace(/\D/g, "") * 1;
};

export const Capitalize = (value = '') => {
	return value
		.toLowerCase()
		.replace(/\w/, (firstLetter) => firstLetter.toUpperCase());
};

const utils = {
	minify: (str) =>
		str
			.replace(/[\r\t]/g, " ")
			.replace(/[\n]/g, " ")
			.replace(/^\s+|\s+$|\s+(?=\s)/g, ""),
};

export const gql = (strings, ...values) => {
	const evaluated = strings.reduce((acc, string, i) => {
		acc.push(string);
		if (values[i]) acc.push(values[i].toString());

		return acc;
	}, []);

	const rules = evaluated.join("");
	return utils.minify(rules);
};

export const randomKey = (range) => {
	const chars =
		"0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
	let result = "";
	for (let i = 0; i < range; i++) {
		const randomIndex = Math.floor(Math.random() * chars.length);
		result += chars[randomIndex];
	}
	return result;
};
