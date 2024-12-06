import styled, { css } from "styled-components";

const WrappTooltip = styled.span`
	display: inline-flex;
	align-items: center;
	justify-content: center;
	position: relative;
	cursor: pointer;

	&:hover .content {
		visibility: visible;
		opacity: 1;
	}
`;

const TooltipContent = styled.span`
	display: inline-block;
	padding: 6px 10px;
	color: #fff;
	font-size: 16px;
	line-height: 1;
	font-weight: 500;
	min-width: ${({ w }) => w}px;
	/* width: ${({ w }) => w ? w + 'px' : 'max-content'}; */
	min-width: max-content;
	position: absolute;
	background-color: #000;
	z-index: 5;
	cursor: initial;
	text-align: left;
	border-radius: 8px;
	visibility: hidden;
	transition: opacity ${({ delay }) => delay}ms linear;
	pointer-events: none;
	opacity: 0;

	&:before {
		content: "";
		display: inline-block;
		width: 0;
		height: 0;
		border: 6px solid transparent;
		position: absolute;
		pointer-events: none;
	}

	${({ direction }) => {
		return direction === "top"
			? cssTop
			: direction === "left"
			? cssLeft
			: direction === "bottom"
			? cssBottom
			: direction === "right"
			? cssRight
			: "";
	}}
`;

const cssTop = css`
	bottom: calc(100% + 10px);

	&:before {
		top: 100%;
		left: calc(50% - 6px);
		border-top-color: #000;
	}
`;

const cssBottom = css`
	top: calc(100% + 10px);

	&:before {
		bottom: 100%;
		left: calc(50% - 6px);
		border-bottom-color: #000;
	}
`;

const cssLeft = css`
	right: calc(100% + 10px);

	&:before {
		left: 100%;
		top: calc(50% - 6px);
		border-left-color: #000;
	}
`;

const cssRight = css`
	left: calc(100% + 10px);

	&:before {
		right: 100%;
		top: calc(50% - 6px);
		border-right-color: #000;
	}
`;

export { WrappTooltip, TooltipContent };
