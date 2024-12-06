import React from "react";
import NavbarDesktop from "./desktop";
import NavbarMobile from "./mobile";
import { scrollToElement } from "@utils";

const Navbar = () => {
	return (
		<>
			<NavbarDesktop onAnimateScroll={scrollToElement} />
			<NavbarMobile onAnimateScroll={scrollToElement} />
		</>
	);
};

export default React.memo(Navbar);
