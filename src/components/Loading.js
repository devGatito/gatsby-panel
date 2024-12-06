import React, { useEffect, useState, useContext } from "react";
import { Flex, Loader, Text } from "@components";
// import AdminContext from "@context";
import styled from "styled-components";

const LoadingWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	align-content: center;
	justify-content: center;
	flex-wrap: wrap;
	position: fixed;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	overflow: hidden;
	z-index: 9999999;
	background-color: rgba(255, 255, 255, 0.8);
	backdrop-filter: blur(6px);
`;

const Loading = ({
	title = "Wait a moment...",
	message = "We are processing information",
}) => {
	return (
		<LoadingWrapper>
			<Flex items="center" justify="center">
				<Loader w={60} />
			</Flex>
			<Text align="center" opacity="0.8" xsSize={18} mdSize={22} mt={20}>
				{title}
			</Text>
			<Text align="center" opacity="0.5" xsSize={14} mdSize={16} mb={40}>
				{message}
			</Text>
		</LoadingWrapper>
	);
};

export default Loading;
