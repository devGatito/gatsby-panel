import React, { useState, useEffect } from "react";
import { ModalOverlay, ModalContent, CloseButton } from "@layout/Modal/styles";
import {
	Text,
	Input,
	Button,
	Select,
	Title,
	Flex,
	Image,
} from "@root/src/components";
import closeIcon from "@assets/icons/XCircle.svg";
import check from "@assets/icons/check.svg";
import { $registerUser, $updateUser } from "@query";
import { runQuery } from "@services";
import { useStore } from "@root/src/storage/store";

const InputModal = ({
	isOpen,
	onClose,
	onAddParticipante,
	editData = null,
	editId,
}) => {
	const { auth } = useStore();
	const [userId, setUserId] = useState(null);
	const [name, setName] = useState("");
	const [phone, setPhone] = useState("");
	const [email, setEmail] = useState("");
	const [role, setRole] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const [confirmationOpen, setConfirmationOpen] = useState(false);

	useEffect(() => {
		if (!editData) return;

		const { name, phone, email, role } = editData;
		setName(name || "");
		setPhone(phone || "");
		setEmail(email || "");
		setRole(role || "");
		setPassword("");
	}, [editData, isOpen]);

	useEffect(() => {
		console.log("editId :: ", editId);
		editId && setUserId(editId);
	}, [editId]);
	if (!isOpen) return null;

	const roles = [
		{ id: "admin", name: "Administrador" },
		{ id: "asesor", name: "Asesor" },
		{ id: "escriturador", name: "Escriturador" },
	];

	const handleSubmit = async () => {
		setLoading(true);
		setError("");

		try {
			if (editData) {
				let input = {
					name,
					phone,
					email,
					role,
				};

				if (password) {
					input = {
						...input,
						password,
					};
				}

				const [response, apiError] = await runQuery({
					token: auth.accessToken,
					query: $updateUser,
					variables: {
						id: userId,
						input,
					},
				});

				console.log("updateUser :: ", response);

				if (apiError || !response || !response.payload?.updateUser) {
					setError("Hubo un problema actualizando el asesor.");
					return;
				}

				onAddParticipante();
			} else {
				const [response, apiError] = await runQuery({
					token: auth.accessToken,
					query: $registerUser,
					variables: {
						input: {
							name,
							phone,
							email,
							role,
							password,
						},
					},
				});

				if (
					apiError ||
					!response ||
					!response.payload.register ||
					!response.payload.register.user
				) {
					setError("Hubo un problema registrando el asesor.");
					return;
				}

				onAddParticipante();
			}

			setConfirmationOpen(true);
		} catch (error) {
			setError("Error en el servidor, intenta nuevamente.");
		} finally {
			setLoading(false);
		}
	};

	const handleConfirmationClose = () => {
		setConfirmationOpen(false);
		onClose();
	};

	return (
		<>
			<ModalOverlay>
				<ModalContent>
					<CloseButton onClick={onClose}>
						<Image
							url={closeIcon}
							alt="Cerrar"
							width={30}
							height={30}
						/>
					</CloseButton>
					<Title size={24} mb={30} weight="600">
						{editData ? "Editar Asesor" : "Registro Asesor"}
					</Title>

					{error && <Text color="red">{error}</Text>}

					<Flex direction="column" gap={20}>
						<Input
							placeholder="Nombre Completo"
							value={name}
							onChange={setName}
							onlyAlpha
						/>
						<Input
							placeholder="Celular"
							value={phone}
							onChange={setPhone}
							onlyNumbers
						/>
						<Input
							placeholder="Correo Electrónico"
							value={email}
							getValue={v => setEmail(v?.toLowerCase())}
							type="email"
						/>
						<Select
							value={role}
							textColor="#000"
							onChange={(e) => setRole(e.target.value)}
							placeholder="Roles"
							options={roles}
							style={{ width: "100%" }}
							otherless
						/>

						<Input
							placeholder="Contraseña"
							value={password}
							onChange={setPassword}
							type="password"
						/>

						<Button
							ttrans="upper"
							theme="primary"
							style={{ width: "100%" }}
							onClick={handleSubmit}
							loading={loading}
							mt={20}
						>
							{loading
								? "Guardando..."
								: editData
									? "Actualizar"
									: "Guardar"}
						</Button>
					</Flex>
				</ModalContent>
			</ModalOverlay>

			{confirmationOpen && (
				<ModalConfirmation
					onClose={handleConfirmationClose}
					editData={editData} // Asegúrate de pasar editData aquí
				/>
			)}
		</>
	);
};

const ModalConfirmation = ({ onClose, editData }) => {
	return (
		<ModalOverlay>
			<ModalContent style={{ textAlign: "center", position: "relative" }}>
				<CloseButton
					onClick={onClose}
					style={{ position: "absolute", top: "10px", right: "10px" }}
				>
					<img
						src={closeIcon}
						alt="Cerrar"
						style={{ width: "20px", height: "20px" }}
					/>
				</CloseButton>

				<img
					src={check}
					style={{
						color: "#18AC42",
						width: "100px",
						height: "100px",
					}}
					alt="Confirmación exitosa"
				/>

				<p>
					{"Asesor " +
						(editData ? "actualizado" : "registrado") +
						" correctamente"}
				</p>
				<Button
					background="#18AC42"
					borderRadius="10px"
					width="278px"
					height="46px"
					color="white"
					onClick={onClose}
				>
					Aceptar
				</Button>
			</ModalContent>
		</ModalOverlay>
	);
};

export default InputModal;
