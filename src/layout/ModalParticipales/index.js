import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {
	Text,
	Input,
	Button,
	Flex,
	Select,
	Title,
	Svg,
	Col,
	Badge,
	Alert,
	Loader,
} from "@root/src/components";
import {
	ModalOverlay,
	ModalContent as OriginalModalContent,
	CloseButton as OriginalCloseButton,
} from "@layout/Modal/styles";
import {
	$createParticipant,
	$updateParticipant,
	$getDevelopments,
	$getParticipantByKRM,
	$resendCodes,
} from "@query";
import { runQuery } from "@services";
import { useStore } from "@root/src/storage/store";

import danger_krm from "@assets/icons/WarningCircle.svg";
import warning_krm from "@assets/icons/warning_krm.svg";
import success_krm from "@assets/icons/success_krm.svg";
import close from "@assets/icons/close.svg";
import { $convertedClient, $deleteParticipant } from "@root/src/query";
import { navigate } from "@root/src/utils";

const ModalContent = styled(OriginalModalContent)`
	display: flex;
	flex-direction: column;
	width: 100%;
	max-width: 90%;
	padding: 20px 40px;
	margin: auto;
	max-height: 90vh;
	overflow: hidden;
	border-radius: 20px;

	@media screen and (min-width: 1440px) {
		max-width: 80%;
	}

	@media screen and (min-width: 1920px) {
		max-width: 60%;
	}
`;

const Separator = styled.div`
	width: 100%;
	height: 1px;
	background-color: #ccc;
	margin: 20px auto;
`;

const participantTypes = [
	{ id: "visita", name: "Visitante" },
	{ id: "cliente", name: "Cliente" },
];

const folioTypes = [
	{ id: "FC", name: "Folio escriturado" },
	{ id: "FV", name: "Folio de visita" },
];

const secondarySegments = [
	{ id: "VIS", name: "VIS" },
	{ id: "VIM", name: "VIM" },
	{ id: "RES", name: "RES" },
];

const requestingState = {
	resend: false,
	create: false,
	converted: false,
	update: false,
	krm: false,
	delete: false,
};

const initialState = {
	id: "",
	krm_id: "",
	name: "",
	email: "",
	phone: "",
	register_type: "",
	folio_type: "",
	status: 0,
	development: {
		id: undefined,
		segment: "",
		development: "",
	},
	converted_client: false,
};

const ModalParticipantes = ({ isOpen, onClose, onComplete }) => {
	const { auth, clearStore } = useStore();

	const [isCreatingParticipant, setIsCreatingParticipant] = useState(false);

	const [showAlert, setShowAlert] = useState(false);
	const [isKRMValid, setIsKRMValid] = useState(1);
	const [participant, setParticipant] = useState(initialState);
	const [errorValidate, setErrorValidate] = useState(false);
	const [isValidateKRM, setIsValidateKRM] = useState(false);
	const [bloquedRegisterType, setBloquedRegisterType] = useState(false);
	const [developments, setDevelopments] = useState([]);
	const [developmentsOptions, setDevelopmentsOptions] = useState([]);

	const [requestings, setRequesting] = useState(requestingState);
	const [operationMessage, setOperationMessage] = useState("");

	useEffect(() => {
		if (isOpen) {
			setIsKRMValid(1);
			getDevelopmentsData();
		}

		return () => {
			setParticipant(initialState);
			setRequesting(requestingState);
		};
	}, [isOpen]);

	useEffect(() => {
		if (isValidateKRM && isCreatingParticipant) {
			switch (auth?.user?.role) {
				case "asesor":
					setParticipant({
						...participant,
						register_type: "visita",
						folio_type: "FV",
					});
					setBloquedRegisterType(true);
					break;
				case "escriturador":
					setParticipant({
						...participant,
						register_type: "cliente",
						folio_type: "FC",
					});
					setBloquedRegisterType(true);
					break;

				default:
					break;
			}
		}
	}, [isValidateKRM, isCreatingParticipant]);

	useEffect(() => {
		if (isCreatingParticipant) {
			if (participant?.register_type !== "") {
				participant?.register_type === "visita"
					? update("folio_type", "FV")
					: update("folio_type", "FC");
			}
		}
	}, [participant.register_type]);

	const handleClose = () => {
		setParticipant(initialState);
		setIsKRMValid(1);
		setIsValidateKRM(false);
		setErrorValidate(false);
		onClose();
	};

	const update = (key, value) => {
		if (["development"].includes(key)) {
			let development =
				developments.find((d) => +d.id === +value) ||
				initialState.development;
			setParticipant((prev) => ({ ...prev, [key]: development }));
		} else {
			setParticipant((prev) => ({ ...prev, [key]: value }));
		}
	};

	const getDevelopmentsData = async () => {
		try {
			const [response, apiError] = await runQuery({
				token: auth.accessToken,
				query: $getDevelopments,
				variables: {},
			});

			if (response?.payload?.getDevelopments) {
				setDevelopments(response.payload.getDevelopments);
				setDevelopmentsOptions(
					response.payload.getDevelopments.map((dev) => ({
						id: dev.id,
						name: dev.development,
					})),
				);
			}
		} catch (error) {
			console.error(error);
		}
	};

	const handleValidateKRM = async () => {
		setRequesting({
			...requestings,
			krm: true,
		});
		const id = participant.krm_id;
		const email = participant.email;

		try {
			const [response, apiError] = await runQuery({
				token: auth.accessToken,
				query: $getParticipantByKRM,
				variables: { id },
			});

			console.log(":: se eejcuto validate ::", response);

			if (apiError || response?.status !== 200) {
				setErrorValidate(true);

				setTimeout(() => {
					alert(
						"Ah ocurrido un error al realizar esta accion porfavor vuelve a inciar sesión.",
					);
					clearStore();
					navigate("/adminer");
				}, 3000);
				return;
			}

			if (!response?.payload?.getParticipantKRM) {
				setIsKRMValid(3); // el 3 significa que esta disponible
				setIsCreatingParticipant(true);
				if (email) setParticipant({ ...initialState, krm_id: id });
				return;
			}

			setIsKRMValid(2); // el 2 significa que ya esta en uso
			setIsCreatingParticipant(false);
			const payload = response.payload.getParticipantKRM;
			setParticipant({
				...participant,
				...payload,
			});
		} catch (error) {
			setIsKRMValid(1); // el 1 es un status neutro para no mostrar la opcion 2 o 3
			console.error(error.message);
		} finally {
			setIsValidateKRM(true);
			setRequesting({
				...requestings,
				krm: false,
			});
		}
	};

	const handleCreateParticipant = async () => {
		if (!isCreatingParticipant) return;

		setRequesting({
			...requestings,
			create: true,
		});

		const data = { ...participant };
		const development_id = +data.development.id;
		const segment = data.development.segment;

		delete data.id;
		delete data.development;
		delete data.converted_client;
		delete data.codes;

		const input = {
			...data,
			status: 1,
			registered_by: +auth?.user?.id,
			development_id,
			segment,
		};

		try {
			const [response, apiError] = await runQuery({
				token: auth.accessToken,
				query: $createParticipant,
				variables: { input },
			});

			if (
				apiError ||
				response.status !== 200 ||
				!response.payload?.createParticipant
			) {
				alert(
					"Ah ocurrido un error al realizar esta accion porfavor vuelve a inciar sesión.",
				);
				clearStore();
				navigate("/adminer");
				return;
			}

			console.log("Participante creado correctamente:", response);

			onComplete();
		} catch (error) {
			console.error("Error en la petición:", error);
		} finally {
			setRequesting({
				...requestings,
				create: false,
			});
		}
	};

	const handleResendCodes = async () => {
		if (isCreatingParticipant) return;
		setRequesting({
			...requestings,
			resend: true,
		});

		try {
			const input = { participant_id: participant.id };
			const [response, apiError] = await runQuery({
				token: auth.accessToken,
				query: $resendCodes,
				variables: { input },
			});

			if (
				apiError ||
				response.status !== 200 ||
				!response.payload?.resendCodes
			) {
				alert(
					"Ah ocurrido un error al realizar esta accion porfavor vuelve a inciar sesión.",
				);
				clearStore();
				navigate("/adminer");
				return;
			}

			console.log("Códigos reenviados correctamente:", response);
			setOperationMessage(
				"Se han reenviado los códigos por email de forma correcta.",
			);
			setShowAlert(true);
		} catch (error) {
			console.error("Error en la petición:", error);
			alert(
				"Ha ocurrido un error al reenviar los códigos al participante.",
			);
		} finally {
			setRequesting({
				...requestings,
				resend: false,
			});
		}
	};

	const handleConvertClient = async () => {
		if (!["superadmin", "admin", "escriturador"].includes(auth.user.role))
			return;

		try {
			setRequesting({
				...requestings,
				converted: true,
			});
			const input = { converted_client: 1 };
			const [response, apiError] = await runQuery({
				token: auth.accessToken,
				query: $convertedClient,
				variables: { id: participant.id, input },
			});

			if (
				apiError ||
				response.status !== 200 ||
				!response.payload?.updateParticipant
			) {
				alert(
					"Ah ocurrido un error al realizar esta accion porfavor vuelve a inciar sesión.",
				);
				clearStore();
				navigate("/adminer");
				return;
			}

			update("converted_client", true);
			setOperationMessage(
				"Este participante se ha convertido a cliente de forma correcta y se han enviado sus nevos códigos por email.",
			);
			setShowAlert(true);
		} catch (error) {
			console.error(error.message);
			alert(
				"Ocurrio un error al convertir en cliente a este participante.",
			);
		} finally {
			setRequesting({
				...requestings,
				converted: false,
			});
		}
	};

	const handleDeleteClient = async () => {
		if (!["superadmin", "admin"].includes(auth.user.role)) return;

		try {
			setRequesting({
				...requestings,
				delete: true,
			});

			const [response, apiError] = await runQuery({
				token: auth.accessToken,
				query: $deleteParticipant,
				variables: { id: +participant.id },
			});

			if (
				apiError ||
				response.status !== 200 ||
				!response.payload?.deleteParticipant
			) {
				alert(
					"Ah ocurrido un error al realizar esta accion porfavor vuelve a inciar sesión.",
				);
				clearStore();
				navigate("/adminer");
				return;
			}

			update("status", !participant.status);

			setOperationMessage(
				"El status de este participante ha sido actualizado con éxito.",
			);
			setShowAlert(true);
		} catch (error) {
			console.error(error.message);
			alert(
				`Ocurrio un error al ${participant.status ? "desactivar" : "activar"} a este participante`,
			);
		} finally {
			setRequesting({
				...requestings,
				delete: false,
			});
		}
	};

	const handleUpdateParticipant = async () => {
		if (isCreatingParticipant) return;

		setRequesting({
			...requestings,
			update: true,
		});

		try {
			let data = { ...participant };
			data.development_id = +participant.development.id;
			delete data.id;
			delete data.development;
			delete data.codes;

			const input = {
				...data,
				status: data.status ? 1 : 0,
				converted_client: data.converted_client ? 1 : 0,
			};

			const variables = { id: +participant.id, input };

			console.log("variables:: ", variables);

			const [response, apiError] = await runQuery({
				token: auth.accessToken,
				query: $updateParticipant,
				variables,
			});

			console.log("updateParticipant:: ", { response, apiError });

			if (
				apiError ||
				response.status !== 200 ||
				!response?.payload?.updateParticipant
			) {
				alert(
					"Ah ocurrido un error al realizar esta accion porfavor vuelve a inciar sesión.",
				);
				clearStore();
				navigate("/adminer");
				return;
			}

			setOperationMessage(
				"Se ha actualizado correctamente este participante.",
			);
			setShowAlert(true);
		} catch (error) {
			console.error("Error en la petición:", error);
			alert("Ocurrio un error al actualizar a este participante.");
		} finally {
			setRequesting({
				...requestings,
				update: false,
			});
		}
	};

	if (!isOpen) return null;

	return (
		<>
			<ModalOverlay>
				<ModalContent>
					<Flex items="center" justify="between" mb={40}>
						<Title>Registro de participantes</Title>
						<Svg
							cursor="pointer"
							icon={close}
							wsvg={30}
							onClick={() => handleClose()}
						/>
					</Flex>

					<Flex items="center" justify="start" gap={20}>
						<Flex type="inline" width={600} gap={20}>
							<Flex position="relative">
								<Input
									onlyNL
									value={participant.krm_id}
									getValue={(v) => update("krm_id", v)}
									placeholder="Ingresa el KRM"
									error={
										participant.krm_id.length > 0 &&
										participant.krm_id.length < 7
											? "Ingresa un KRM Id valido de 7 digitos"
											: participant.krm_id.length > 0 &&
												  participant.krm_id.length > 7
												? "Ingresa un KRM Id valido no mayor a 7 digitos"
												: ""
									}
								/>
								{requestings.krm && (
									<Loader
										w={20}
										position="absolute"
										right={18}
										top={18}
									/>
								)}
							</Flex>
							<Button
								ttrans="upper"
								theme="primary"
								onClick={() => handleValidateKRM()}
								disabled={
									!participant.krm_id?.length ||
									participant.krm_id.length < 7 ||
									!participant.krm_id?.length ||
									participant.krm_id.length > 7
								}
							>
								Validar KRM
							</Button>
						</Flex>
						{errorValidate && (
							<Badge
								ttrans="unset"
								theme="danger"
								gap={10}
								height={30}
							>
								<Svg icon={danger_krm} wsvg={20} />
								<Text>Ocurrio un error al validar el KRM</Text>
							</Badge>
						)}
						{isValidateKRM && isKRMValid === 2 && (
							<Badge
								ttrans="unset"
								theme="warning"
								gap={10}
								height={30}
							>
								<Svg icon={warning_krm} wsvg={20} />
								<Text>El ID de KRM ya está registrado</Text>
							</Badge>
						)}

						{isValidateKRM && isKRMValid === 3 && (
							<Badge
								ttrans="unset"
								theme="success"
								gap={10}
								height={30}
							>
								<Svg icon={success_krm} wsvg={20} />
								<Text>El ID de KRM esta disponible</Text>
							</Badge>
						)}
					</Flex>

					{!errorValidate && isValidateKRM && (
						<>
							<Flex
								flexDirection="column"
								overflowY="auto"
								flex="1"
							>
								<Separator />
								<Flex
									items="center"
									justify="start"
									mb={20}
									gap={10}
								>
									<Title type="h2">
										{isKRMValid === 3
											? "Ingresa los datos del participante"
											: "Datos asociados con el participante en KRM"}
									</Title>

									{participant.register_type === "visita" &&
										participant.converted_client && (
											<Badge
												ttrans="unset"
												theme="success"
												gap={10}
												height={30}
											>
												<Text>Usuario E&V</Text>
											</Badge>
										)}
									{participant.register_type === "visita" &&
										!participant.converted_client && (
											<Badge
												ttrans="unset"
												theme="warning"
												gap={10}
												height={30}
											>
												<Text>Usuario Visitante</Text>
											</Badge>
										)}
									{participant.register_type === "client" ||
										(participant.converted_client && (
											<Badge
												ttrans="unset"
												theme="info"
												gap={10}
												height={30}
											>
												<Text>Usuario Escriturado</Text>
											</Badge>
										))}
								</Flex>

								<Flex gap={20}>
									<Flex direction="column" gap={10} ph={10}>
										<Input
											placeholder="Nombre Completo"
											value={participant.name}
											getValue={(v) => update("name", v)}
											onlyAlpha
										/>
										<Input
											placeholder="Celular"
											value={participant.phone}
											getValue={(v) => update("phone", v)}
										/>
										<Input
											placeholder="Correo electrónico"
											value={participant.email}
											type="email"
											getValue={(v) =>
												update(
													"email",
													v?.toLowerCase(),
												)
											}
										/>
										{["superadmin", "admin"].includes(
											auth?.user?.role,
										) &&
											!isCreatingParticipant &&
											!!participant?.codes?.length && (
												<>
													<Title type="h3" mb={20}>
														Reenvía los códigos
														generados por email
													</Title>

													<Flex gap="10px">
														<Button
															theme="primary"
															width="218px"
															height="46px"
															color="white"
															onClick={() =>
																handleResendCodes()
															}
															loading={
																requestings.resend
															}
														>
															Reenviar códigos
														</Button>
													</Flex>
												</>
											)}
									</Flex>
									<Flex direction="column" gap={10} ph={10}>
										<Select
											value={participant.register_type}
											options={participantTypes}
											getValue={(v) =>
												update("register_type", v)
											}
											disabled={
												participant.converted_client ||
												bloquedRegisterType
											}
											textColor="#000"
											placeholder="Tipo de Participante"
											otherLess
										/>
										<Select
											value={participant.folio_type}
											getValue={(v) =>
												update("folio_type", v)
											}
											placeholder="Tipo Folio"
											options={folioTypes}
											disabled
											otherLess
										/>
										<Select
											value={participant.development.id}
											getValue={(v) =>
												update("development", v)
											}
											placeholder="Desarrollo"
											options={developmentsOptions}
											otherLess
										/>
										<Select
											value={
												participant.development.segment
											}
											// getValue={(v) => update("segment", v)}
											placeholder="Segmento"
											options={secondarySegments}
											disabled
											otherLess
										/>
									</Flex>
								</Flex>
							</Flex>
							<Separator />
							<Flex justify="start" gap={20} pt={10}>
								{!isCreatingParticipant &&
									[
										"superadmin",
										"admin",
										"escriturador",
									].includes(auth?.user?.role) &&
									!participant.converted_client && (
										<Button
											theme="primary"
											onClick={() =>
												handleConvertClient()
											}
											loading={requestings.converted}
										>
											Convertir a cliente
										</Button>
									)}

								<Flex type="inline" gap={20}>
									{["superadmin", "admin"].includes(
										auth?.user?.role,
									) &&
										!isCreatingParticipant && (
											<Button
												theme="primary"
												backgroundColor="#F15660"
												loading={requestings.delete}
												onClick={() =>
													handleDeleteClient()
												}
											>
												{participant.status
													? "Desactivar participante"
													: "Activar participante"}
											</Button>
										)}
									<Button
										theme="primary"
										backgroundColor="#5694F1"
										onClick={
											isCreatingParticipant
												? handleCreateParticipant
												: handleUpdateParticipant
										}
										loading={
											isCreatingParticipant
												? requestings.create
												: requestings.update
										}
									>
										{isCreatingParticipant
											? "Registrar Participante"
											: "Actualizar Participante"}
									</Button>
								</Flex>
							</Flex>
						</>
					)}
				</ModalContent>
			</ModalOverlay>

			{showAlert && (
				<Alert
					position="fixed"
					bottom="2rem"
					right="2rem"
					zIndex="999999"
					background="white"
					type="success"
					onClose={() => {
						setOperationMessage("");
						setShowAlert(false);
					}}
				>
					{operationMessage || "Proceso ejecutado correctamente"}
				</Alert>
			)}
		</>
	);
};

export default ModalParticipantes;
