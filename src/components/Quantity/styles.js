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
	border: none;
	color: #707372;
	background-color: transparent;

	&:hover {
		background-color: rgba(0, 0, 0, 0.05);
	}
	${(props) => SuperCSS.hydrate(props)}
`;

const Quantity = styled.div`
	display: flex;
	width: 100%;
	flex-wrap: nowrap;
	color: #707372;
	justify-content: space-between;
	height: 40px;
	border-bottom: solid;
	border-bottom-width: ${(props) => (props.hasError ? "2px" : "1px")};
	border-bottom-color: ${(props) => {
		if (props.hasError) {
			return "#E82A4D";
		}
		if (props.disabled) {
			return "rgba(83,86,90,0.4)";
		} else {
			return "#768692";
		}
	}};
	background-color: #fcfcfc;
	margin-bottom: 20px;
	${(props) => SuperCSS.hydrate(props)}
`;

const QuantityWrapper = styled.div`
	display: inline-flex;
	width: 120px;
	min-width: 120px;
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
