import styled, { css } from "styled-components";
import { SuperCSS } from "@utils";

const Wrapper = styled.picture`
	overflow: hidden;
	position: relative;
	display: block;
	border: none;
	outline: 0;

	width: 100%;
	height: 100%;

	img {
		width: 100%;
		height: 100%;
		opacity: 0;

		transition: opacity 400ms ease-out;
		/* transform: scale(1.05); */
		&.load {
			opacity: 1;
		}
	}

	${(props) => SuperCSS.hydrate(props)}
`;

export { Wrapper };
