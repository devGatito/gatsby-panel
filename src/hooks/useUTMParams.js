import { useEffect, useState } from "react";
import { hasWindow } from "../utils";

function useUTMParams() {
	const [utmParameters, setUtmParameters] = useState({});

	useEffect(() => {
		const params = new URLSearchParams(
			hasWindow() ? window.location.search : null,
		);
		const utm = {};

		// Definir los parámetros UTM que se desean capturar
		const utmKeys = [
			"utm_source",
			"utm_campaign",
			"utm_content",
		];

		utmKeys.forEach((key) => {
			const value = params.get(key);
			if (value) {
				utm[key] = value;
			} else {
				utm[key] = "";
			}
		});

		setUtmParameters(utm);
	}, []);

	return utmParameters;
}

export default useUTMParams;
