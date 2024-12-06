import React from "react";
import { Links } from "@constants";
import { Flex, Container, Text } from "@components";

import fb from "@assets/social/facebook.svg";
import ins from "@assets/social/instagram.svg";
import top from "@assets/icons/top.svg";

const Footer = () => {
	return (
		<>
			<Flex justify="center" background="white" position="fixed" bottom="0" width="100%">
				<Container xsPh={30} mdPh={0} pv={10}>
					<Flex items="center" justify="between">
						<Text size={14} opacity="0.4">&copy; Ruba Querétaro {new Date().getFullYear()}</Text>
						<Text size={14} type="link" href={Links.DigitalBooting} target="_blank" color="black" opacity="0.4">Sitio construido por Digital Booting | Agencia Creativa de Marketing Digital</Text>
					</Flex>
				</Container>

				
			</Flex>
		</>
	);
};

export default React.memo(Footer);
