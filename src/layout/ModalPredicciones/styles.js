import styled from "styled-components";

// Estilos principales del modal
export const ModalWrapper = styled.div`
	display: flex;
	width: 100%;
	max-width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.4);
	position: fixed;
	top: 0;
	left: 0;
	z-index: 99999;
	justify-content: center;
	align-items: flex-start;
	padding-top: 100px;
	overflow-x: hidden;
`;

export const ModalContent = styled.div`
	display: block;
	width: 100%;
	height: auto;
	max-width: 90%;
	position: relative;
	overflow: hidden;
	background-color: white;
	border-radius: 20px;

	@media screen and (min-width: 1024px) {
		max-width: 900px;
	}
`;
