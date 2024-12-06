import st, { css } from "styled-components";
import { SuperCSS } from "@utils";

const getStyleAlert = (type) => {
	const style = {
		info: css`
			background-color: rgba(36, 99, 245, 0.2);
		`,
		success: css`
			background-color: rgba(1, 191, 88, 0.2);
		`,
		warning: css`
			background-color: rgba(255, 184, 0, 0.2);
		`,
		danger: css`
			background-color: rgba(253, 55, 31, 0.2);
		`,
	};

	return style[type];
};

const Alert = st.div`
	display: flex;
	align-items: ${({ align }) => (align ? align : "stretch")};
	align-content: ${({ align }) => (align ? align : "stretch")};
	flex-direction: ${({ reverse }) => (reverse ? "row-reverse" : "row")};
	flex-wrap: nowrap;
	width: ${({ block }) => (block ? "100%" : "auto")};
	min-width: 200px;
	max-width: ${({ mw }) => (mw ? mw : "400px")};
	padding: 0.5rem;
	border-radius: ${({ rounded }) => (rounded ? 200 : 10)}px;
	background-color white;
	
	${({ inline }) =>
		inline
			? "border: 1px solid rgba(0, 0, 0, 0.1);"
			: "box-shadow: 0 2px 10px -5px rgba(0, 0, 0, 0.2);"}
	${(props) => SuperCSS.hydrate(props)}
`;

const AlertContent = st.div`
	flex: 1;
	padding-left: 1rem;
	padding-right: 1rem;
	${(props) => SuperCSS.hydrate(props)}
`;

const AlertIcon = st.span`
	display: inline-flex;
	border-radius: ${({ rounded }) => (rounded ? 200 : 8)}px;

	align-items: center;
	align-content: center;
	justify-content: center;
	width: 40px;
	min-width: 40px;
	height: 40px;
	min-height: 40px;
	${(props) => SuperCSS.hydrate(props)}
`;

const AlertSvg = st.span`
	display: inline-flex;
	align-items: center;
	align-content: center;
	justify-content: center;
	width: 100%;
	height: 100%;
	border-radius: ${({ rounded }) => (rounded ? 200 : 8)}px;
	${({ type }) => getStyleAlert(type)}
	${(props) => SuperCSS.hydrate(props)}
`;

export { Alert, AlertContent, AlertIcon, AlertSvg };
