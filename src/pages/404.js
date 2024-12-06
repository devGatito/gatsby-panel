import React from "react";
import { home } from "@seo";
import { Layout } from "@layout";
import { Flex, Seo, Title } from "@components";

/**
 * Page error 404
 */
const HomePage = () => {
	return (
		<Layout>
			<Flex items="center" justify="center">
				<Title>404</Title>
				<Title type="h3">Error page not found</Title>
			</Flex>
		</Layout>
	);
};

export const Head = () => <Seo {...home} />;
export default HomePage;
