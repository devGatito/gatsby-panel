import styled, { css } from "styled-components";
import { SuperCSS } from "@utils";

const ligthCss = css`
	background-color: #F6F6F6;
	color: #232525;

	&:hover {
		background-color: #f1f1f1;
	}
`;

const linkCss = css`
	background-color: transparent;
	color: #232525;

	&:hover {
		color: #000;
		background-color: #f8f8f8;
	}
`;

const overCss = css`
	background-color: rgba(255, 255, 255, 0.2);

	&:hover {
		background-color: #fff;
	}
`;

const primaryCSS = css`
	background-color: #006436;
	color: white;

	&:hover {
		background-color: #232525;
	}
`;

const secondaryCSS = css`
	background-color: black;
	color: #fff;
	transition: all 200ms ease;

	&:hover {
		background-color: #232525;
		transform: scale(1.05);
	}
`;

const outlineCSS = css`
	background-color: transparent;
	box-shadow: 0 0 0 1px rgb(from black r g b / 40%);
	transition: all 100ms linear;
	color: #000;

	&:hover {
		box-shadow: 0 0 0 1px black;
		background-color: transparent;
	}
`;

const Base = styled.button`
	display: inline-flex;
	align-items: center;
	align-content: center;
	justify-content: center;
	background-color: transparent;
	border-radius: ${({ square, circle }) => (square ? 0 : circle ? 50 : 5)}px;
	border: 2px solid transparent;
	cursor: pointer;
	font-family: "Poppins";
	font-size: 14px;
	width: ${({ w, small }) => (w ? w : small ? 30 : 40)}px;
	height: ${({ w, small }) => (w ? w : small ? 30 : 40)}px;
	min-width: ${({ w, small }) => (w ? w : small ? 30 : 40)}px;
	min-height: ${({ w, small }) => (w ? w : small ? 30 : 40)}px;
	text-align: center;
	transition: background 200ms ease-in-out;

	svg {
		display: inline-block;
		vertical-align: middle;
	}

	&:disabled,
	&:disabled:hover {
		box-shadow: none;
		background: transparent;
		border: 2px solid #e0e0e0;
		color: #e0e0e0;
		cursor: not-allowed;
	}

	${({ nohover }) =>
		!nohover &&
		css`
			&:hover,
			&:focus,
			&:active {
				background-color: #F6F6F6;
				border: 2px solid transparent;
				color: white;
			}
		`}

	${({ light, primary, secondary, link, outline, over }) =>
		(link && linkCss) ||
		(light && ligthCss) ||
		(primary && primaryCSS) ||
		(outline && outlineCSS) ||
		(over && overCss) ||
		(secondary && secondaryCSS)}
		
	${(props) => SuperCSS.hydrate(props)}
`;

export { Base };
