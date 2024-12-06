import React from "react";
import { ModalWrapper, ModalContent } from "./styles";
import { Svg } from "@root/src/components";

import close from "@assets/icons/close.svg";

const ModalPredicciones = ({ show = false, onClose, children }) => {
	if (!show) return null;
	return (
		<ModalWrapper>
			<ModalContent>
				<Svg
					icon={close}
					onClick={onClose}
					wsvg={30}
					cursor="pointer"
					position="absolute"
					top="0.5rem"
					right="0.5rem"
				/>
				{children}
			</ModalContent>
		</ModalWrapper>
	);
};

export default ModalPredicciones;
