String.prototype.toTitleCase = function () {
	return (
		this.replace(/\w\S*/g, function (txt) {
			return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
		}) || ""
	);
};

Array.prototype.purge = function () {
	let filterArray = [];
	for (var i = 0; i < this.length; i++) {
		if (!!this[i]) {
			filterArray.push(this[i]);
		}
	}
	return filterArray;
};
