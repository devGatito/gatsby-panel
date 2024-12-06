import { useState, useEffect, useContext } from "react";
import { Temporizer } from "@utils";
import { navigate } from 'gatsby';
// import AdminContext from "@context";
import { Logout } from "@services"

const useCaducidad = (onClose, initTimer, show) => {
	// const { auth: { email,token }} = useContext(AdminContext)
	// const [initTime, setInitTime] = useState(false);
	// const [[mins, secs], setTimer] = useState([2, 59]);

	// const initCountTimer = () => {
	// 	if (!mins && !secs) {
	// 		onClose && onClose();
	// 		if (typeof window !== "undefined") {
	// 			Logout({email, token}).then(() => {
	// 				navigate('/login?expiredSession=true');
	// 			})
	// 		}
	// 	} else if (secs === 0) {
	// 		setTimer([mins - 1, 59]);
	// 	} else {
	// 		setTimer([mins, secs - 1]);
	// 	}
	// };

	// const checkRegresiveTimer = () => {
	// 	if (show && document.visibilityState === "visible") {
	// 		console.log(Temporizer("regressiveCount"));
	// 		if (!!+sessionStorage.regressiveCount) {
	// 			const { hours, minutes, seconds } = Temporizer("regressiveCount");
	// 			const mins = 2 - minutes > 0 ? 2 - minutes : 0;
	// 			const secs = minutes < 2 ? 60 - seconds : 0;

	// 			if(hours > 0) {
	// 				handleClose()
	// 			}else {
	// 				setTimer([mins, secs === 60 ? 59 : secs]);
	// 			}
	// 		} else {
	// 			setTimer([2, 59]);
	// 		}
	// 	}
	// };

	// const handleClose = () => {
	// 	setInitTime(false);
	// 	setTimer([2, 59]);
	// 	onClose && onClose();
	// };

	// useEffect(() => {
	// 	initTimer && setInitTime(true);
	// 	let timerId = null;

	// 	if (initTimer) {
	// 		timerId = setInterval(() => initCountTimer(), 1000);
	// 		show &&
	// 			typeof window !== "undefined" &&
	// 			document.addEventListener(
	// 				"visibilitychange",
	// 				checkRegresiveTimer,
	// 				true
	// 			);
	// 	}
	// 	return () => clearInterval(timerId);
	// });

	// return {
	// 	initTime,
	// 	handleClose,
	// 	mins,
	// 	secs,
	// 	show
	// };
	return null
};

export default useCaducidad;
