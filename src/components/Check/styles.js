import styled from "styled-components";

const CheckInput = styled.input`
	// El input seguirá estando "oculto", pero aún será accesible
	display: block;
	height: 0;
	width: 0;
	opacity: 0;
	position: absolute;

	// Lógica de mostrar los íconos en base a si el checkbox está seleccionado o no
	&:checked + label #checked {
		display: inline-flex;
	}
	&:checked + label #empty {
		display: none;
	}

	&:not(:checked) + label #checked {
		display: none;
	}
	&:not(:checked) + label #empty {
		display: inline-flex;
	}
`;

const WrapCheck = styled.span`
	display: flex;
	justify-content: start;
	align-items: center;
	width: 100%;

	label {
		text-decoration: ${({ disabled }) =>
			disabled ? "line-through" : "none"};
		cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
		color: ${({ disabled }) => (disabled ? "#bbb" : "black")};
	}
`;

const Label = styled.label`
	cursor: pointer;
	display: inline-flex;
	align-items: center;
	font-size: 14px;
	margin-left: 8px;
`;

export { Label, CheckInput, WrapCheck };
