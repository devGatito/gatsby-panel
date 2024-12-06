import React from "react";
import styled, { css } from "styled-components";
import { SuperCSS } from "@utils";

const Wrapper = styled.div`
	display: ${({ type }) => (type === "inline" ? "inline-flex" : "flex")};
	width: ${({ type }) => (type === "inline" ? "auto" : "100%")};

	${({ autofill }) =>
		autofill &&
		css`
			& > *:not(.ignore) {
				flex: 1;
			}
		`}

	${(props) => SuperCSS.hydrate(props)}
`;

const Flex = ({ children, ...props }) => {
	return <Wrapper {...props}>{children}</Wrapper>;
};

export default Flex;
