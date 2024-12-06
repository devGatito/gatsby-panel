import React from "react";
import { Button, Flex, Modal, Text } from "@components";
import { Timer } from "./styles";
import useCaducidad from "./hooks";

import secureAlert from "@assets/icons/alert-warning.svg";

const ModalTimerComponent = ({ show, onClose, initTimer, onRefresh }) => {
	const { initTime, handleClose, mins, secs } = useCaducidad(
		onClose,
		initTimer,
		show,
	);

	return (
		<Modal
			width={500}
			show={show}
			onClose={() => handleClose()}
			icon={secureAlert}
			unClosed
			title="Hola, ¿sigues por aquí?"
		>
			<div className="ph:2 pt:2">
				<Text size={14} weight="500">
					Notamos que has estado inactivo, por seguridad si no
					registramos actividad de tu parte la sesión se cerrará en
				</Text>
			</div>

			<Timer>
				{initTime ? (
					<Text xsSize={38} mdSize={42} weight="500" align="center">
						0{mins}:{secs < 10 ? "0" + secs : secs}
					</Text>
				) : (
					<Text xsSize={38} mdSize={42} weight="500" align="center">
						02:59
					</Text>
				)}
			</Timer>

			<Flex justify="center" mv={20} gap={10}>
				<Button theme="action" onClick={() => onRefresh && onRefresh()}>
					Aún estoy aquí
				</Button>
			</Flex>
		</Modal>
	);
};

export default React.memo(ModalTimerComponent);
