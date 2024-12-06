const MSDATE = {
	MS_SECONDS: 1000,
	MS_MINUTES: 1000 * 60,
	MS_HOURS: 1000 * 60 * 60,
	MS_DAYS: 1000 * 60 * 60 * 24
};
const { MS_DAYS, MS_HOURS, MS_MINUTES, MS_SECONDS } = MSDATE;

const timer = (key) => {
	let lastActivity = sessionStorage.getItem(key);
	lastActivity = new Date(+lastActivity);

	if (lastActivity) {
		const currentActivity = new Date();
		const DIFFERENCE = currentActivity - lastActivity;
		return {
			hours: Math.floor((DIFFERENCE % MS_DAYS) / MS_HOURS),
			minutes: Math.floor((DIFFERENCE % MS_HOURS) / MS_MINUTES),
			seconds: Math.floor((DIFFERENCE % MS_MINUTES) / MS_SECONDS),
		};
	} else {
		return {
			hours: 0,
			minutes: 0,
			seconds: 0,
		};
	}
};

export const getDiffTimer = (lastActivity) => {
	const currentActivity = new Date();
	const DIFFERENCE = currentActivity - lastActivity;
	return {
		hours: Math.floor((DIFFERENCE % MS_DAYS) / MS_HOURS),
		minutes: Math.floor((DIFFERENCE % MS_HOURS) / MS_MINUTES),
		seconds: Math.floor((DIFFERENCE % MS_MINUTES) / MS_SECONDS),
	};
}

export default timer;
