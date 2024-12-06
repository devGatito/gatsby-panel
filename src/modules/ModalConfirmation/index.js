import React from "react";
import { ModalOverlay, ModalContent, CloseButton } from "@layout/Modal/styles";
import closeIcon from "@assets/icons/XCircle.svg";
import check from "@assets/icons/alert-success.svg";
import { Button, Image, Svg, Text } from "@root/src/components";

const ModalConfirmation = ({ onClose, editData }) => {
	return (
		<ModalOverlay>
			<ModalContent style={{ textAlign: "center", position: "relative" }}>
				<CloseButton
					onClick={onClose}
					style={{ position: "absolute", top: "10px", right: "10px" }}
				>
					<Image
						url={closeIcon}
						alt="Cerrar"
						width={30}
						height={30}
					/>
				</CloseButton>

				<Svg icon={check} wsvg={140} alt="Confirmación exitosa" />

				<Text mv={30}>Proceso realizado correctamente.</Text>
				<Button
					theme="primary"
					background="#18AC42"
					onClick={onClose}
					ttrans="upper"
				>
					Aceptar
				</Button>
			</ModalContent>
		</ModalOverlay>
	);
};

export default ModalConfirmation;
