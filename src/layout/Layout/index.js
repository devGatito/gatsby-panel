import React, { useEffect } from "react";
import { useSession } from "@hooks";
import { getLocation } from "@utils";
import { useStore } from "@storage/store";
import { Container, Flex, Text } from "@root/src/components";

const Layout = ({ children }) => {
	const { setRoute } = useStore();
	useSession();

	useEffect(() => {
		const r = getLocation("pathname")
			.split("/")
			.filter((r) => !!r);
		r.length && setRoute(r);

		document.body.classList.add("loaded");
		return () => document.body.classList.remove("loaded");
	}, []);

	return (
		<div id="root" style={{ position: "relative" }}>
			{children}
			<Flex
				justify="center"
				background="white"
				position="fixed"
				bottom="0"
				zIndex={10}
			>
				<Container>
					<Flex
						xsDirection="column"
						mdDirection="row"
						justify="between"
						item="center"
						padding="0.5rem 1rem"
					>
						<Text
							xsAlign="center"
							mdAlign="left"
							size={12}
							margin={0}
							color="#ccc"
						>
							&copy; Ruba Querétaro {new Date().getFullYear()}
						</Text>
						<Text
							xsAlign="center"
							mdAlign="right"
							size={12}
							type="link"
							href="https://digitalbooting.com"
							target="_blank"
							margin={0}
							color="#ccc"
						>
							Sitio construido por Digital Booting | Agencia
							Creativa de Marketing Digital
						</Text>
					</Flex>
				</Container>
			</Flex>
		</div>
	);
};

export default React.memo(Layout);
