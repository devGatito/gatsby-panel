import styled from "styled-components";
import { SuperCSS } from "@utils";

const Button = styled.button`
	display: inline-flex;
	align-items: center;
	justify-content: center;
	width: 40px;
	height: 40px;
	min-width: 40px;
	min-height: 40px;
	cursor: pointer;
	transition: background-color 100ms linear;
	border: 1px solid #d1d9e5;
	border-radius: 8px;
	color: #707372;
	background-color: transparent;

	&:hover {
		background-color: #d1d9e5;
	}
	${(props) => SuperCSS.hydrate(props)}
`;

const Quantity = styled.div`
	display: inline-flex;
	flex-wrap: nowrap;
	color: #707372;
	justify-content: space-between;
	height: 40px;
	overflow: hidden;

	${(props) => SuperCSS.hydrate(props)}
`;

const QuantityWrapper = styled.div`
	display: flex;
	width: 100%;
	align-items: center;
	justify-content: center;
	${(props) => SuperCSS.hydrate(props)}
`;

const Label = styled.label`
	user-select: none;
	pointer-events: none;
	color: #707372;
	font-size: inherit;
	font-family: inherit;
	min-width: 40px;
	height: 40px;
	display: flex;
	align-items: center;
	justify-content: center;
	${(props) => SuperCSS.hydrate(props)}
`;

export { Label, Button, Quantity, QuantityWrapper };
