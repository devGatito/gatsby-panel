import styled, { css } from "styled-components";
import { SuperCSS } from "@utils";

const styles = css`
	display: inline-flex;
	position: relative;
	background-image: url(${({ icon }) => icon});
	background-repeat: no-repeat;
	background-position: center;
	background-size: contain;
	transition: all 200ms linear;
	object-fit: contain;
	${(props) => SuperCSS.hydrate(props)}
`;

const Graphic = styled.i`
	${styles}
`;

export { Graphic };
