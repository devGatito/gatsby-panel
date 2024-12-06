import styled from "styled-components";
import { SuperCSS } from "@utils";

const Portal = styled.div`
	display: flex;
	align-items: center;
	align-content: center;
	justify-content: center;
	overflow-x: hidden;
	z-index: 99999;

	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(255, 255, 255, 0.95);
	transition: opacity 100ms ease;

	opacity: ${({ show }) => (!show ? 0 : 1)};
	pointer-events: ${({ show }) => (!show ? "none" : "all")};

	#slide {
		transition: margin-left 500ms ease-in-out;
	}

	.slide_item {
		transition: all 0.2s;
	}

	${(props) => SuperCSS.hydrate(props)}
`;

const PortalHeader = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	padding: 1rem 2rem;
	z-index: 200;
	background: white;

	${(props) => SuperCSS.hydrate(props)}
`;

const PortalButton = styled.div`
	position: absolute;
	transform: translateY(-50%);
	top: 50%;
	/* opacity: 0.5; */
	transition: opacity 100ms ease;
	background: white;
	display: flex;
	justify-content: center;
	align-items: center;
	height: 50px;
	width: 50px;
	padding: 0.8em;
	border-radius: 5px;
	box-shadow:
		20px 20px 60px #bebebe,
		-20px -20px 60px #ffffff;
	cursor: pointer;
	z-index: 500;

	&:hover {
		opacity: 1;
	}

	${(props) => SuperCSS.hydrate(props)}
`;

export { Portal, PortalHeader, PortalButton };
