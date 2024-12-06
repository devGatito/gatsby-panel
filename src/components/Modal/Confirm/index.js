import React from "react";
import { Modal, Text, Flex, Col, Button } from "@components";
import secureAlert from "@assets/icons/alert-info.svg";

const ModalConfirm = ({ show, onClose, onAccept, children }) => {
	return (
		<Modal
			width={500}
			show={show}
			onClose={onClose}
			icon={secureAlert}
			unClosed
			title="Please wait..."
		>
			<Col ph={20} pt={20}>
				<Text align="center" size={16} type="strong">
					{children}
				</Text>
			</Col>

			<Flex flexWrap="wrap" justify="center" ph={20} pv={20} gap={20}>
				<Button theme="outline" onClick={() => onClose()}>
					Cancel
				</Button>
				<Button theme="action" onClick={() => onAccept()}>
					Confirm
				</Button>
			</Flex>
		</Modal>
	);
};

export default ModalConfirm;
