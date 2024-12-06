import { Button, Flex, Loader, Svg, Text } from "@root/src/components";
import React, { useState } from "react";

import warning from "@assets/icons/lock.svg";
import { navigate } from "@root/src/utils";
import { useEffect } from "react";

const UnauthorizedModule = ({ role, text, action }) => {
	const [url, setUrl] = useState("");

	useEffect(() => {
		switch (role) {
			case "superadmin":
			case "admin":
				setUrl("/adminer/dashboard");
				break;
			case "asesor":
			case "escriturador":
				setUrl("/asesores/dashboard");
				break;
			default:
				setUrl("/adminer");
				break;
		}
	}, [role]);

	return (
		<Flex
			direction="column"
			items="center"
			justify="center"
			minHeight="100vh"
		>
			<Svg icon={warning} wsvg={120} />
			<Text>
				{text || "No tienes el nivel de acceso para ver este contenido"}
			</Text>
			<Button
				theme="primary"
				ttrans="upper"
				mt={40}
				onClick={() => navigate(url)}
			>
				{action || "VOLVER AL INICIO"}
			</Button>
		</Flex>
	);
};

export default UnauthorizedModule;
