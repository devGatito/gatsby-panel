import styled, { keyframes } from "styled-components";
import { SuperCSS } from "@root/src/utils";

export const Container = styled.div`
	font-family: Arial, sans-serif;
`;

export const Header = styled.div`
	display: flex;
	justify-content: space-between; // Espacio entre el título y el botón
	align-items: center;
	margin-top: 50px;
	padding: 0 20px; // Margen interno para las esquinas

	@media (max-width: 768px) {
		margin-top: 20px;
		padding: 0 10px; // Reducir el padding en móvil
	}
`;

export const Title = styled.h2`
	margin: 0;
	font-size: 1rem;
	font-weight: 500;

	@media (max-width: 768px) {
		text-indent: 0; // Quitar sangría en móviles
		font-size: 0.9rem;
		flex-grow: 1; // Asegurar que el título crezca para ocupar el espacio disponible
	}

	@media (max-width: 480px) {
		font-size: 0.8rem;
	}
`;

export const UserProfile = styled.div`
	display: flex;
	align-items: center;
	position: relative; /* Agregado para que el dropdown se posicione correctamente */
`;

export const ProfileName = styled.span`
	margin-right: 1rem;
	font-size: 0.9rem;
	color: #888;
`;

export const Button = styled.button`
	background-color: black;
	color: white;
	border: none;
	padding: 0.5rem 1rem;
	border-radius: 5px;
	cursor: pointer;

	&:hover {
		background-color: #333;
	}
`;

export const Table = styled.table`
	width: 100%;
	border-collapse: collapse;
	margin-top: 1.5rem;
`;

export const TableHead = styled.thead`
	background-color: #f9f9f9;
	text-align: left;
`;

export const TableRow = styled.tr`
	border-bottom: 1px solid #ddd;
`;

export const TableHeader = styled.th`
	padding: 1rem;
	color: #888;
	font-weight: normal;
	font-size: 0.9rem;
`;

export const TableCell = styled.td`
	padding: 1rem;
	color: #333;
	font-size: 0.9rem;
`;

export const Actions = styled.div`
	display: flex;
	gap: 0.5rem;
`;

export const ActionButton = styled.button`
	background-color: #f0f0f0;
	border: none;
	padding: 0.5rem;
	border-radius: 5px;
	cursor: pointer;

	&:hover {
		background-color: #e0e0e0;
	}

	svg {
		width: 1rem;
		height: 1rem;
	}
`;
export const DashboardContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	height: 100vh;
`;
export const HeaderAdminWrapper = styled.header`
	width: 100%;
	padding: 1rem;
	display: flex;
	justify-content: space-between;
	align-items: center;

	${(props) => SuperCSS.hydrate(props)}
`;
export const HeaderAdmin = styled.header`
	width: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;
	background-color: #eef0f4;
`;
export const MainContent = styled.main`
	text-align: center;
	margin-top: 4rem;

	@media (max-width: 480px) {
		margin-top: 2rem;
	}
`;
export const WelcomeMessage = styled.h1`
	font-size: 2rem;
	color: #4b79ff;
	margin-bottom: 3rem;

	@media (max-width: 768px) {
		font-size: 1.5rem;
	}

	@media (max-width: 480px) {
		font-size: 1.2rem;
		margin-bottom: 2rem;
	}
`;
export const CardGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	gap: 2rem;
	max-width: 900px;

	@media (max-width: 1024px) {
		grid-template-columns: repeat(2, 1fr);
	}

	@media (max-width: 768px) {
		grid-template-columns: repeat(2, 1fr);
	}

	@media (max-width: 480px) {
		grid-template-columns: 1fr;
		gap: 1rem;
	}
`;

export const Card = styled.div`
	background-color: #edf1ff;
	border-radius: 12px;
	padding: 2rem;
	text-align: center;
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
	transition: transform 0.3s;

	&:hover {
		transform: translateY(-5px);
	}

	@media (max-width: 480px) {
		padding: 1.5rem;
	}
`;

export const IconPlaceholder = styled.div`
	width: 60px;
	height: 60px;
	margin-bottom: 1rem;
	border-radius: 50%;
	border: 2px solid #4b79ff;
	display: inline-block;

	@media (max-width: 480px) {
		width: 50px;
		height: 50px;
	}
`;

export const CardText = styled.p`
	font-size: 1rem;
	color: #333;

	@media (max-width: 480px) {
		font-size: 0.9rem;
	}
`;
export const ArrowIcon = styled.div`
	width: 0;
	height: 0;
	margin-left: 8px;
	border-left: 6px solid transparent;
	border-right: 6px solid transparent;
	border-top: 6px solid black;
	transition: transform 0.3s ease;

	transform: ${({ showDropdown }) =>
		showDropdown ? "rotate(180deg)" : "rotate(0deg)"};
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;
export const DropdownMenu = styled.ul`
	position: absolute; /* Mantener la posición absoluta */
	top: 100%; /* Se mantiene justo debajo del botón */
	right: 0px; /* Cambiar left: 0 por right: 0 */
	background-color: white;
	box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.1);
	list-style: none;
	padding: 10px;
	border-radius: 4px;
	animation: ${fadeIn} 0.3s ease;
	z-index: 1;
	marginright: "50px" li {
		padding: 8px 16px;
		cursor: pointer;

		&:hover {
			background-color: #f1f1f1;
		}
	}
`;
