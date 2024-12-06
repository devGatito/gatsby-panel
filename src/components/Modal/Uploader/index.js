import React from "react";
import { Modal, Flex, Text, Svg } from "@components";

import Wait from "@assets/icons/waiting.svg";
import success from "@assets/icons/alert-success.svg";

const ModalUploader = ({ show, completed }) => {
	return (
		<Modal
			unClosed
			width={500}
			show={show}
			icon={Wait}
			title="¡Porfavor se paciente!"
		>
			<div className="ph:2 pt:2">
				<Text size={14} type="strong">
					Estamos subiendo los archivos al sistema, esto tomará unos
					minutos, te avisaremos si sucede algo.
				</Text>
			</div>

			{!completed ? (
				<Flex mt={30} items="center" justify="center">
					<div className="Spinner">
						<div className="SpinnerHalf SpinnerHalf--left"></div>
						<div className="SpinnerHalf SpinnerHalf--right"></div>
					</div>
				</Flex>
			) : (
				<Flex mt={30} items="center" justify="center">
					<Svg icon={success} wsvg={60} />
				</Flex>
			)}

			<Text size={12} type="strong" align="center" opacity="0.5" pv={20}>
				{!completed
					? "Subiendo archivos..."
					: "Se completo la carga de archivos"}
			</Text>
		</Modal>
	);
};

export default ModalUploader;
