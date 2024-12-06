import styled, { css } from "styled-components";
import { SuperCSS } from "@utils";
import * as colors from "@constants/colors";

const primaryStyles = css`
	background-color: ${colors.primary};
	color: ${colors.whiteText};

	&:hover {
		background-color: ${colors.black};
	}
`;

const alterStyles = css`
	background-color: white;
	color: black;

	&:hover {
		background-color: ${colors.black};
		color: white;
	}
`;

const frontStyles = css`
	background-color: red;
	color: white;

	&:hover {
		background-color: #b21f1a;
	}
`;

const outlineStyles = css`
	background-color: transparent;
	border: 1px solid black;
	color: black;

	&:hover {
		background-color: ${colors.black};
		color: white;
	}
`;

const actionStyles = css`
	background-color: ${colors.black};
	color: white;

	&:hover {
		color: ${colors.primary};
	}
`;

const lightStyles = css`
	background-color: rgb(from black r g b / 5%);
	color: #181818;

	&:hover {
		background-color: ${colors.primary};
		color: white;
	}
`;

const baseStyles = css`
	display: inline-flex;
	background-color: transparent;
	gap: calc(16px / 2);
	align-items: center;
	align-content: center;
	justify-content: center;
	text-align: center;
	position: relative;
	white-space: nowrap;
	transition: all 200ms ease;
	padding: 1.2rem 2rem;
	border: 1px solid transparent;
	border-radius: 10px;
	font-weight: 300;
	overflow: hidden;
	cursor: pointer;
	line-height: 1;
	font-size: inherit;

	* {
		margin: 0;
		padding: 0;
	}

	&:disabled,
	&:disabled:hover {
		box-shadow: none;
		background: transparent;
		border: 2px solid #e0e0e0;
		color: #e0e0e0;
		cursor: not-allowed;
	}

	span {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 20;
	}

	${({ loading }) =>
		loading &&
		css`
			span {
				opacity: 0.2;
				font-size: inherit;
			}
			.loader-button {
				position: absolute;
				left: 40%;
				transform-origin: center center;
				transform: translateX(-50%);
				top: calc(50% - ${({ w }) => w / 2 || 11});
				z-index: 2;
			}
		`}

	${({ theme }) => ["primary"].includes(theme) && primaryStyles}
	${({ theme }) => ["action"].includes(theme) && actionStyles}
	${({ theme }) => ["light"].includes(theme) && lightStyles}
	${({ theme }) => ["outline"].includes(theme) && outlineStyles}
	${({ theme }) => ["alter"].includes(theme) && alterStyles}
	${({ theme }) => ["front"].includes(theme) && frontStyles}
	${(props) => SuperCSS.hydrate(props)}
`;

const IconCircle = styled.i`
	height: 25px;
	width: 25px;
	border-radius: 40px;
	background-color: #53565a;
	display: inline-block;
	vertical-align: middle;
	text-align: center;
	margin-right: 15px;
	transition: background 100ms linear;
	svg {
		fill: #fff;
		transition: color 100ms linear;
	}
	${(props) => SuperCSS.hydrate(props)}
`;

const Base = styled.button`
	${baseStyles}
`;
const BaseLink = styled.a`
	${baseStyles}
`;

export { Base, BaseLink, IconCircle };
