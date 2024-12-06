import React, { useEffect, useState } from "react";
import {
	HeaderAdminWrapper,
	Title,
	UserProfile,
	DropdownMenu,
	ArrowIcon,
} from "./styles";
import { Links } from "@constants";
import { Flex, Container, Text, Badge } from "@root/src/components";
import MiddleWare from "@middlewares/inactive";

import { useLocation } from "@reach/router";
import { useStore } from "@storage/store"; // Acceso al estado global
import { navigate } from "@root/src/utils";

const HeaderAdmin = () => {
	const [showDropdown, setShowDropdown] = useState(false);
	const location = useLocation(); // Obtiene la ubicación actual
	const { auth, clearStore } = useStore(); // Accede al estado global para el usuario

	// Función para definir el título basado en la ruta actual
	const getTitle = () => {
		switch (location.pathname) {
			case Links.panelAdmin:
				return "Dashboard Admin";
			case Links.gestionAsesoresAdmin:
				return "Gestión de Asesores";
			case Links.vistaEstadisticasAdmin:
				return "Participantes";
			case Links.participantesAdmin:
				return "Usuarios";
			case Links.reportesAdmin:
				return "Reportes";
			case Links.panelAsesores:
				return "Dashboard Asesores";
			case Links.participantesAsesores:
				return "Participantes Asesores";
			case Links.analisisPredictivo:
				return "Análisis Predictivo";
			default:
				return "Admin Panel";
		}
	};

	const handleToggleDropdown = () => {
		setShowDropdown(!showDropdown);
	};

	const handleLogout = () => {
		clearStore();
		navigate(Links.adminInicio);
	};

	return (
		<MiddleWare>
			<Flex justify="center" backgroundColor="#F8FBFF">
				<Container lgMaxw="90%">
					<HeaderAdminWrapper position="relative">
						<Badge theme="action">{getTitle()}</Badge>

						<Flex items="center" justify="center" flex="1" gap={30}>
							{["superadmin", "admin"].includes(
								auth?.user?.role,
							) && (
								<Text href={Links.panelAdmin} type="link">
									Dashboard
								</Text>
							)}
							{["superadmin", "admin"].includes(
								auth?.user?.role,
							) && (
								<Text
									href={Links.gestionAsesoresAdmin}
									type="link"
								>
									Asesores
								</Text>
							)}
							{["superadmin", "admin"].includes(
								auth?.user?.role,
							) && (
								<Text
									href={Links.participantesAdmin}
									type="link"
								>
									Usuarios registrados
								</Text>
							)}
							{["superadmin", "admin"].includes(
								auth?.user?.role,
							) && (
								<Text href={Links.reportesAdmin} type="link">
									Reportes
								</Text>
							)}
							{["superadmin", "admin"].includes(
								auth?.user?.role,
							) && (
								<Text
									href={Links.vistaEstadisticasAdmin}
									type="link"
								>
									Participantes
								</Text>
							)}
						</Flex>

						<UserProfile onClick={handleToggleDropdown}>
							{/* Mostrar el nombre del usuario si está logueado */}
							{auth.user?.name || "Ruba Admin"}
							<ArrowIcon isOpen={showDropdown} />
						</UserProfile>

						{showDropdown && (
							<DropdownMenu>
								<li onClick={handleLogout}>Cerrar sesión</li>
							</DropdownMenu>
						)}
					</HeaderAdminWrapper>
				</Container>
			</Flex>
		</MiddleWare>
	);
};

export default HeaderAdmin;
