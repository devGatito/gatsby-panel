import styled, { css } from "styled-components";
import { SuperCSS } from "@utils";

const Portal = styled.div`
	display: flex;
	align-items: start;
	align-content: center;
	justify-content: center;
	overflow-x: hidden;
	z-index: 99999;

	padding-top: 150px;
	padding-bottom: 50px;
	padding-left: 20px;
	padding-right: 20px;

	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(255, 255, 255, 0.95);
	transition: opacity 100ms ease;

	opacity: ${({ show }) => (!show ? 0 : 1)};
	pointer-events: ${({ show }) => (!show ? "none" : "all")};
	${(props) => SuperCSS.hydrate(props)}
`;

const Modal = styled.div`
	display: block;
	width: ${({ width }) => width || 500}px;
	max-width: ${({ maxw }) => maxw || "100%"};
	border-radius: 5px;
	min-height: 100px;
	z-index: 9999999;
	background-color: #ffffff;
	color: #232525;
	box-shadow: 0 2px 10px -2px rgba(0, 0, 0, 0.2);
	${(props) => SuperCSS.hydrate(props)}
`;

const ModalHeader = styled.div`
	position: relative;
	display: block;
	padding: 40px 5% 0;
	${(props) => SuperCSS.hydrate(props)}
`;

const ModalContent = styled.div`
	position: relative;
	display: block;
	padding: 0;
	${(props) => SuperCSS.hydrate(props)}
`;

const ModalFooter = styled.div`
	position: relative;
	display: block;
	padding: 40px 5%;
	${(props) => SuperCSS.hydrate(props)}
`;

export { Portal, Modal, ModalHeader, ModalFooter, ModalContent };
