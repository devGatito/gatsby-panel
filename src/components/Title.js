import React from "react";
import styled from "styled-components";

import { SuperCSS } from "@utils";

const Title1 = styled.h1`
	${(props) => SuperCSS.hydrate(props)}
`;
const Title2 = styled.h2`
	${(props) => SuperCSS.hydrate(props)}
`;
const Title3 = styled.h3`
	${(props) => SuperCSS.hydrate(props)}
`;

const Title = ({ type, children, ...props }) => {
	switch (type) {
		case "h2":
			return <Title2 {...props}>{children}</Title2>;
		case "h3":
			return <Title3 {...props}>{children}</Title3>;
		default:
			return <Title1 {...props}>{children}</Title1>;
	}
};

export default Title;
