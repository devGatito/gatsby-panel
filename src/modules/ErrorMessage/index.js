import { Button, Flex, Loader, Svg, Text } from "@root/src/components";
import React from "react";

import warning from "@assets/icons/WarningCircle.svg";
import { navigate } from "@root/src/utils";

const ErrorMessageModule = ({
	text = "Ha ocurrido un error en la sesión, porfavor inicia sesión nuevamente",
}) => {
	return (
		<Flex
			direction="column"
			items="center"
			justify="center"
			minHeight="100vh"
		>
			<Svg icon={warning} wsvg={120} />
			<Text>{text}</Text>
			<Button
				theme="primary"
				ttrans="upper"
				mt={40}
				onClick={() => navigate("/adminer")}
			>
				Iniciar sesión
			</Button>
		</Flex>
	);
};

export default ErrorMessageModule;
