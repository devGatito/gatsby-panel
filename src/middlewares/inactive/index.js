import React, { useContext, useEffect, useState } from "react";
import { ModalTimer } from "@components";
import useInactive from "./hooks";
import { runQuery } from "@services";
import { $checkToken, $refreshUser } from "@query";
import { useStore } from "@storage/store";
import { navigate } from "@root/src/utils";

const Middleware = ({ children }) => {
	console.log("Middleware inicializado");
	const { clearStore, auth, setAuth } = useStore();
	const { inactive } = useInactive(
		() => {
			console.log("El usuario ha estado inactivo durante 15 minutos");
			// Mostrar el modal aquí
			setShowModal(true);
		},
		async () => {
			console.log("El usuario ha vuelto a la página");
			// Verificar el token aquí
			const [payload, status] = await runQuery({
				query: $checkToken(auth.accessToken),
				variables: {},
				token: auth.accessToken,
			});

			switch (payload?.checkTokenStatus) {
				case 2:
					// token expirado
					setShowModal(true);

					break;
				case 3:
				case 4:
					// cualquier otro status, 3 o 4 requieren inciar sesión
					clearStore();
					const error = btoa(
						btoa(
							"Tu sesión ha expirado, porfavor ingresa de nuevo",
						),
					);
					navigate(`/adminer?error=${error}`);
					break;

				default:
					// status 1: token válido
					break;
			}
		},
	);

	const refreshToken = async () => {
		const [response, statusError] = await runQuery({
			query: $refreshUser(auth.accessToken),
			variables: {},
			token: auth.accessToken,
		});

		console.log("refrshToken:: ", response, statusError);
		const error = btoa(
			btoa("Tu sesión ha expirado, porfavor ingresa de nuevo"),
		);

		if (statusError || !response?.payload?.refreshToken) {
			navigate(`/adminer?error=${error}`);
		}
		const { token: accessToken, user } = response?.payload?.refreshToken;

		setAuth((prev) => ({
			...prev,
			accessToken,
			user,
		}));

		setShowModal(false);
	};

	const [showModal, setShowModal] = useState(false);

	return (
		<>
			{children}
			{inactive && showModal && (
				<ModalTimer
					initTimer={showModal}
					show={showModal}
					onClose={() => {
						setShowModal(false);
					}}
					onRefresh={() => refreshToken()}
				/>
			)}
		</>
	);
};

export default React.memo(Middleware);
