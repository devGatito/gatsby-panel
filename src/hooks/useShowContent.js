import { useState, useEffect } from "react";

const useShowContent = () => {
	const [hasLoaded, setLoadedContent] = useState(false);

	useEffect(() => {
		setTimeout(() => {
			setLoadedContent(true);
			document.body.classList.add("loaded");
		}, 1000);

		return () => document.body.classList.remove("loaded");
	}, []);

	return hasLoaded
}

export default useShowContent;
