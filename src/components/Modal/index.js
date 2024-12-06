import React, { useEffect } from "react";
import {
	Portal,
	Modal,
	ModalHeader,
	ModalFooter,
	ModalContent,
} from "./styles";

import { Flex, Col, Svg, Text, Button, Title } from "@components";
import iconAlert from "@assets/icons/alert-warning.svg";
import success from "@assets/icons/alert-success.svg";

const ModalComponent = ({
	show,
	width,
	onClose,
	children,
	icon,
	iconless,
	type,
	title,
	titleless,
	isCancel,
	className,
	unClosed,
	...props
}) => {
	useEffect(() => {
		document.body.style.overflow = "hidden";
		return () => (document.body.style.overflow = "initial");
	});

	return (
		<Portal show={show}>
			{show && (
				<Modal width={width} {...props}>
					<ModalHeader>
						{!iconless && (
							<Flex justify="center" align="center" mb={20}>
								<Svg
									icon={
										icon
											? icon
											: type === "success"
											? success
											: iconAlert
									}
									wsvg={80}
								/>
							</Flex>
						)}
						{!titleless && (
							<Title size={24} align="center">
								{title || "Oh no!"}
							</Title>
						)}
					</ModalHeader>
					<ModalContent>{children}</ModalContent>
					{!unClosed && (
						<ModalFooter>
							<Flex justify="center" align="center" gap={20}>
								{isCancel && (
									<Button
										theme="outline"
										onClick={() => onClose()}
									>
										Cancelar
									</Button>
								)}

								<Button
									theme="action"
									onClick={() => onClose()}
								>
									Aceptar
								</Button>
							</Flex>
						</ModalFooter>
					)}
				</Modal>
			)}
		</Portal>
	);
};

export default ModalComponent;
