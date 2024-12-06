import styled, { css } from "styled-components";
import { primary } from "@constants/colors";

export const SliderWrapper = styled.div`
	width: 100%;
	overflow: ${({ noOverflow }) => (noOverflow ? "visible" : "hidden")};
	position: relative;
`;

export const SliderContent = styled.div`
	display: flex;
	transition: transform 0.5s ease-in-out;
	${({ activeIndex }) => css`
		transform: translateX(-${activeIndex * 100}%);
	`}
`;

export const SlideContainer = styled.div`
	min-width: 100%;
`;

export const Slide = styled.div`
	min-width: 100%;
	height: ${({ height }) => height}px;
	background-size: cover;
	background-position: center;
	position: relative;
`;

export const NavButton = styled.button`
	position: absolute;
	top: 50%;
	transform: translateY(-50%);
	background: rgb(from ${primary} r g b / 50%);
	backdrop-filter: blur(4px);
	opacity: 0.4;
	border: none;
	border-radius: 6px;
	padding: 10px;
	cursor: pointer;
	z-index: 1;

	transition: all 200ms ease;

	&:hover {
		opacity: 1;
	}

	${({ left }) =>
		left &&
		css`
			left: 1rem;
		`}

	${({ right }) =>
		right &&
		css`
			right: 1rem;
		`}
`;

export const Dots = styled.div`
	position: absolute;
	bottom: 10px;
	width: 100%;
	display: flex;
	justify-content: center;
`;

export const Dot = styled.button`
	border: none;
	background: ${({ active }) =>
		active ? "#fff" : "rgb(from white r g b / 30%)"};
	border-radius: 50%;
	margin: 0 8px;
	padding: 6px;
	cursor: pointer;
`;
