import React from "react";
import { Link } from "gatsby";
import { Links } from "@constants";
import FacebookLogo from "@assets/social/FacebookLogo.svg";
import Inst from "@assets/social/igw.svg";
import { Container, Flex, Image, Text } from "@components";

import ruba from "@assets/ruba.svg";

const PolicyLinks = () => {
	return (
		<>
			<Flex
				direction="column"
				justify="center"
				alignItems="center"
				style={{
					width: "100%",
					padding: "15px 0",
					gap: "20px",
					color: "#6F6F6F",
				}}
			>
				<Flex
					mt={30}
					xsDirection="column"
					mdDirection="row"
					gap={40}
					justify="center"
					items="center"
				>
					{[
						{
							to: Links.avisoPrivacidad,
							text: "Aviso de Privacidad",
						},
						{
							to: Links.terminosCondiciones,
							text: "Términos y Condiciones",
						},
					].map((link, index) => (
						<Text
							type="link"
							key={index}
							href={link.to}
							target="_blank"
							style={{
								textAlign: "center",
								textDecoration: "none",
								color: "#6F6F6F",
								fontSize: "0.9rem",
							}}
						>
							{link.text}
						</Text>
					))}
				</Flex>

				<Flex justify="center">
					<Image url={ruba} width={160} mv="3rem" />
				</Flex>

				<div
					style={{
						borderBottom: "1px solid #BFBFBF",
						width: "80%",
						margin: "5px 0",
					}}
				/>

				<Flex justify="center">
					<Text
						size={12}
						opacity="0.6"
						align="center"
						mdMaxw={600}
						style={{
							width: "80%",
						}}
					>
						Vigencia del 17 de Octubre de 2024 al 31 de Enero del
						2025. <br />
						Al participar en este concurso organizado por Ruba,
						aceptas que los códigos enviados te permiten participar
						únicamente si eres mayor de 18 años y residente en
						México. Los premios no son canjeables por efectivo. Tus
						datos serán tratados conforme a nuestro{" "}
						<Text
							type="link"
							size={12}
							href="https://ruba.mx/aviso-de-privacidad"
							target="_blank"
						>
							Aviso de Privacidad
						</Text>{" "}
						y la participación implica la aceptación de los{" "}
						<Text
							type="link"
							size={12}
							href="https://cuentacon.ruba.com.mx/terminos_y_condiciones.pdf"
							target="_blank"
						>
							Términos y Condiciones.
						</Text>
					</Text>
				</Flex>

				<Flex justify="center" xsMb={100} mdMb={60} gap={20} mt={20}>
					<Text
						type="link"
						href="https://www.instagram.com/rubaresidencialqueretaro/"
						target="_blank"
					>
						<img
							src={Inst}
							alt="Instagram"
							width={26}
							height={26}
						/>
					</Text>
					<Text
						type="link"
						href="https://www.facebook.com/qroresidencial/"
						target="_blank"
					>
						<img
							src={FacebookLogo}
							alt="Facebook"
							width={26}
							height={26}
						/>
					</Text>
				</Flex>
			</Flex>
		</>
	);
};

export default PolicyLinks;
