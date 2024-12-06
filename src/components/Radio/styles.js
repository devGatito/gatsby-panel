import styled, { css } from "styled-components";

const Radio = styled.input`
	display: block;
	height: 0px;
	margin: 0;
	opacity: 0;
	width: 0px;

	&:checked ~ #checked {
		display: inline-flex;
	}
	&:checked ~ #empty {
		display: none;
	}

	&:not(:checked) ~ #checked {
		display: none;
	}
	&:not(:checked) ~ #empty {
		display: inline-flex;
	}
`;

const WrapRadio = styled.span`
	display: flex;
	justify-content: start;
	align-items: center;
`;

const Label = styled.label`
	cursor: pointer;
	display: inline-flex;
	align-items: center;
	font-size: 14px;
`;

export { Label, Radio, WrapRadio };
