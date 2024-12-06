import React, { useEffect, useState } from "react";
import {
	Button,
	Container,
	Flex,
	Image,
	Input,
	Svg,
	Text,
	Title,
} from "@components";
import { Layout } from "@layout";
import { Link } from "gatsby";
import FooterLinks from "@layout/PolicyLinks";
import { Links } from "@constants";
import { CheckBox } from "@components";
import { runQuery } from "@services";
import { $validateCode } from "@query";
import { useStore } from "@storage/store";

import wp from "@assets/wp.svg";
import iconoAdvertencia from "@assets/icons/warning_krm.svg";
import logo from "@assets/logo.png";
import logo2 from "@assets/logo2.png";
import star from "@assets/star.svg";
import arrow from "@assets/arrow.svg";
import pinceles from "@assets/pinceles.png";
import mujer from "@assets/mujer.png";
import depa from "@assets/depa.png";
import domotica from "@assets/domotica.png";

import bg from "@assets/bg.png";
import { navigate } from "../utils";

const initialState = {
	code: "",
};

const LoginClient = () => {
	const { auth, setAuth, setRoute, clearStore } = useStore();
	const [error, setError] = useState("");
	const [data, setData] = useState(initialState);
	const [checkedValue, setCheckedValue] = useState(false);

	useEffect(() => {
		getInitialToken();
	}, []);

	const getInitialToken = async () => {
		const [response, apiError] = await runQuery({
			query: `
				mutation LoginAnonymous {
					generateAnonymousToken {
						token
						uuid
					}
				}`,
			variables: {},
		});

		if (response?.payload?.generateAnonymousToken) {
			setAuth({
				...auth,
				accessToken: response.payload.generateAnonymousToken.token,
			});
		}
	};

	const handleCheckBoxChange = ({ checked, value }) => {
		setCheckedValue(checked);
	};

	const update = (key, value) => {
		setData({
			...data,
			[key]: value,
		});
	};

	const handleSubmit = async () => {
		setError("");
		const { code } = data;

		if (!code) {
			setError("Por favor, ingresa el código.");
			return;
		}

		if (!checkedValue) {
			setError("Debes aceptar el aviso de privacidad para continuar.");
			return;
		}

		try {
			const [response, apiError] = await runQuery({
				query: $validateCode,
				variables: { code },
			});

			if (
				apiError ||
				response.status !== 200 ||
				!response.payload.validateCode
			) {
				setError("Código inválido");
				return;
			}

			navigate(`${Links.analisisPredictivo}?token=${btoa(code)}`);
			clearStore();
		} catch (error) {
			console.error("Error al validar el código:", error);
			setError(
				"Ocurrió un error inesperado. Intenta de nuevo más tarde.",
			);
		}
	};

	return (
		<>
			<Layout overflowX="hidden">
				
				<Title>hello Word</Title>
			
			</Layout>
		</>
	);
};

export default LoginClient;
