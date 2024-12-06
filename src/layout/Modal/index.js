import React from "react";
import { ModalOverlay, ModalContent, CloseButton } from "./styles";
import check from "@assets/icons/alert-success.svg";
import close from "@assets/close.svg";
import { Flex, Image, Svg, Text } from "@root/src/components";

const ConfirmationModal = ({ isOpen, onClose }) => {
	if (!isOpen) return null;

	return (
		<ModalOverlay>
			<ModalContent style={{ textAlign: "center" }}>
				<Flex items="center" justify="center" direction="column">
					<Image
						url={check}
						width={120}
						height={120}
						alt="Descripción de la imagen"
					/>
					<Text align="center" mv={30}>
						Predicción enviada correctamente
					</Text>
				</Flex>

				<Svg
					position="absolute"
					top="1rem"
					right="1rem"
					icon={close}
					onClick={onClose}
					wsvg={30}
				/>
			</ModalContent>
		</ModalOverlay>
	);
};

export default ConfirmationModal;
