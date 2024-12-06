function useNumberFormat() {
	function formatCurrency(number) {
		const formatter = new Intl.NumberFormat("en-US", {
			style: "currency",
			currency: "USD",
		});

		return formatter.format(number);
	}

	return { formatCurrency };
}

export default useNumberFormat;
