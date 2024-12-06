import React from "react";
import styled, { css } from "styled-components";
import { SuperCSS } from "@utils";

const styles = css`
	${(props) => SuperCSS.hydrate(props)}
`;

const Wrapper = styled.p`
	${styles}
`;

const WrapperLink = styled.a`
	color: inherit;
	text-decoration: none;
	transition: all 200ms ease;
	cursor: pointer;

	&:hover {
		color: ${({ hoverColor }) => hoverColor || "black"};
	}

	${styles}
`;

const WrapperBold = styled.strong`
	color: black;
	${styles}
`;

const WrapperSpan = styled.span`
	${styles}
`;

const Text = ({ type, children, ...props }) => {
	switch (type) {
		case "link":
			return <WrapperLink {...props}>{children}</WrapperLink>;
		case "strong":
			return <WrapperBold {...props}>{children}</WrapperBold>;
		case "span":
			return <WrapperSpan {...props}>{children}</WrapperSpan>;
		default:
			return <Wrapper {...props}>{children}</Wrapper>;
	}
};

export default Text;
