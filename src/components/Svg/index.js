import React from "react";
import { Graphic } from "./styles";

const Svg = ({ children, ...props }) => {
	return <Graphic {...props}>{children}</Graphic>;
};

export default Svg;
