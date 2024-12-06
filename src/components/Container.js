import React from "react";
import styled from "styled-components";
import { SuperCSS } from "@utils";

const Wrapper = styled.div`
	width: 100%;
	margin-left: auto;
	margin-right: auto;
	display: block;
	${(props) => SuperCSS.hydrate(props)}
`;

const Container = ({ children, smMaxw, mdMaxw, lgMaxw, ...props }) => {
	return (
		<Wrapper
			smMaxw={smMaxw || "90%"}
			mdMaxw={mdMaxw || "80%"}
			lgMaxw={lgMaxw || "1280px"}
			width="100%"
			{...props}
		>
			{children}
		</Wrapper>
	);
};

export default Container;
