import React from "react";
import styled from "styled-components";
import { SuperCSS } from "@utils";

const Column = styled.div`
	${(props) => SuperCSS.hydrate(props)}
`;

const Col = ({ children, ...props }) => {
	return <Column {...props}>{children}</Column>;
};

export default Col;
