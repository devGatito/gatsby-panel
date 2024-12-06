import { Flex, Loader, Text } from "@root/src/components";
import React from "react";

const LoadingModule = () => {
	return (
		<Flex
			direction="column"
			items="center"
			justify="center"
			minHeight="100vh"
		>
			<Loader w={60} />
			<Text>Cargado datos, por favor espere...</Text>
		</Flex>
	);
};

export default LoadingModule;
