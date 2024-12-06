import React from "react";
import styled, { css } from "styled-components";
import { primary } from "@constants/colors";
import { SuperCSS } from "@utils";

const ThemePrimary = css`
	background-color: ${primary};
	color: white;
`;
const ThemeLight = css`
	background-color: #F6F6F6;
`;
const ThemeAction = css`
	background-color: black;
	color: white;
`;
const ThemeSuccess = css`
	background-color: #DCFFE6;
	color: #18AC42;
`;
const ThemeDanger = css`
	background-color: #FFDCDC;
	color: #D62A19;
`;
const ThemeWarning = css`
	background-color: #FFF1DC;
	color: #AC9418;
`;
const ThemeInfo = css`
	background-color: #DCF4FF;
	color: #1865AC;
`;

const Wrapper = styled.span`
	display: inline-flex;
	align-items: center;
	align-content: center;
	justify-content: center;
	line-height: 1.4;
	height: 24px;
	min-width: 24px;
	min-height: 24px;
	padding: 10px;
	border-radius: 30px;
	font-size: 14px;
	font-weight: 300;
	text-transform: capitalize;
	white-space: nowrap;

	${({ theme }) => theme === "primary" && ThemePrimary}
	${({ theme }) => theme === "action" && ThemeAction}
	${({ theme }) => theme === "light" && ThemeLight}
	${({ theme }) => theme === "success" && ThemeSuccess}
	${({ theme }) => theme === "danger" && ThemeDanger}
	${({ theme }) => theme === "warning" && ThemeWarning}
	${({ theme }) => theme === "info" && ThemeInfo}

	${(props) => SuperCSS.hydrate(props)}
`;

const Badge = ({ children, ...props }) => (
	<Wrapper {...props}>{children}</Wrapper>
);

export default Badge;
