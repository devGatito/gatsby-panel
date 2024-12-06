import styled from "styled-components";
import { Text, Button, Title } from "@components";
import React from "react";

// Componente de estilo reutilizable
export const CustomHeader = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-top: 50px;
	padding: 0;

	@media (max-width: 768px) {
		margin-top: 20px;
		padding: 0 10px;
	}
`;

// Componente funcional reutilizable
const Listado = ({ title, buttonText, onButtonClick, buttonColor }) => (
	<CustomHeader>
		<Title size={50}>{title}</Title>
		<Button
			theme="primary"
			ttrans="upper"
			style={{ backgroundColor: buttonColor }} // Usa el color pasado como prop
			onClick={onButtonClick}
		>
			{buttonText}
		</Button>
	</CustomHeader>
);

export default Listado;
