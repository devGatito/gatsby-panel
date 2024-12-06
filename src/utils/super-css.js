import SuperCSSProps from "@digitalbooting/react-super-css";
import config from "@constants/reactive";

const { BREAKPOINTS, BREAKPOINTS_PREFIX, alias, values } = config;

const SuperCSS = new SuperCSSProps({
	alias,
	values,
	breakpoints: BREAKPOINTS,
	breakpointsPrefix: BREAKPOINTS_PREFIX,
	supportCSSProps: ["backdrop-filter"],
});

export default SuperCSS;
