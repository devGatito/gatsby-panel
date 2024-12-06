import React from "react";
import styled, { keyframes } from "styled-components";
import { SuperCSS } from "@utils";

const spin = keyframes`
	from {
		transform: rotate(270deg);
	}
	to{
		transform: rotate(630deg);
	}
`;

const Spinner = styled.div`
	display: inline-block;
	border-radius: 100%;
	border: 2px solid
		rgba(${({ whited, color }) => (whited ? "255,255,255" : color ? color : "0,0,0")}, 1);
	border-left-color: transparent;
	animation: ${spin} 1s linear infinite;

	width: ${({ w }) => w || 22}px;
	height: ${({ w }) => w || 22}px;
	min-width: ${({ w }) => w || 22}px;
	min-height: ${({ w }) => w || 22}px;

	${(props) => SuperCSS.hydrate(props)}
`;

const Loader = ({ ...props }) => <Spinner {...props}></Spinner>;
export default Loader;
