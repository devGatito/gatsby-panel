import { useState, useEffect, useRef, useCallback } from "react";

const LIMIT_MINUTES = 15;
const LIMIT_MILLISECONDS = LIMIT_MINUTES * 60 * 1000;

const useInactive = (onInactive, onTokenCheck) => {
	const [inactive, setInactive] = useState(false);
	const lastActivityRef = useRef(new Date().getTime());
	let interval = null;

	const checkInactive = useCallback(() => {
		const now = new Date().getTime();
		const difference = now - lastActivityRef.current;
		if (difference >= LIMIT_MILLISECONDS) {
			clearInterval(interval);
			setInactive(true);
			if (onInactive) onInactive();
		}
	}, []);

	const resetTimer = useCallback(() => {
		clearInterval(interval);
		lastActivityRef.current = new Date().getTime();
		interval = setInterval(checkInactive, LIMIT_MILLISECONDS);
		console.log("Timer reset");
	}, []);

	const handleVisibilityChange = () => {
		if (document.visibilityState === "visible") {
			resetTimer();
			if (onTokenCheck) onTokenCheck();
		}
	};

	useEffect(() => {
		resetTimer();
		document.addEventListener("click", resetTimer);
		document.addEventListener("mousewheel", resetTimer);
		document.addEventListener("visibilitychange", handleVisibilityChange);

		return () => {
			clearInterval(interval);
			document.removeEventListener("click", resetTimer);
			document.removeEventListener("mousewheel", resetTimer);
			document.removeEventListener(
				"visibilitychange",
				handleVisibilityChange,
			);
		};
	});

	return { inactive };
};

export default useInactive;
