const dotenv = require("dotenv");

dotenv.config({
	path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
	pathPrefix: process.env.REACT_APP_ROUTER_BASE || "",
	trailingSlash: "never",
	siteMetadata: {
		typeContent: "website",
		title: `Cuenta con Ruba - Desarrollos Inmobiliarios`,
		agencyName: "Ruba Desarrollos",
		description:
			"Cuenta con Ruba ofrece desarrollos inmobiliarios de alta calidad, con opciones de vivienda accesibles y modernas en diversas ubicaciones.",
		siteUrl: `https://cuentaconruba.mx`,
		author: "Ruba Desarrollos",
		image: `src/assets/icon.png`,
		keywords: [
			"Desarrollos Inmobiliarios",
			"Vivienda Accesible",
			"Vivienda Moderna",
			"Ruba Desarrollos",
			"Cuenta con Ruba",
			"Casas en Venta",
			"Departamentos en Venta",
			"Bienes Raíces",
			"Proyectos Inmobiliarios",
			"Vivienda en México",
			"Desarrollos Habitacionales",
			"Vivienda de Calidad",
			"Ruba",
			"CDMX",
			"Vivienda en CDMX",
			"Hogar",
		],
		// Metadatos Open Graph
		og: {
			type: "website",
			title: "Cuenta con Ruba - Desarrollos Inmobiliarios",
			description:
				"Cuenta con Ruba ofrece desarrollos inmobiliarios de alta calidad, con opciones de vivienda accesibles y modernas en diversas ubicaciones.",
			url: "https://cuentaconruba.mx",
			image: "src/assets/icon.png",
		},
		// Metadatos de la Tarjeta de Twitter
		twitter: {
			card: "summary_large_image",
			title: "Cuenta con Ruba - Desarrollos Inmobiliarios",
			description:
				"Cuenta con Ruba ofrece desarrollos inmobiliarios de alta calidad, con opciones de vivienda accesibles y modernas en diversas ubicaciones.",
			image: "src/assets/icon.png",
		},
	},
	plugins: [
		"gatsby-plugin-sass",
		"gatsby-plugin-no-sourcemaps",
		"gatsby-plugin-styled-components",
		{
			resolve: "gatsby-plugin-manifest",
			options: {
				icon: "src/assets/icon.png",
				display: "minimal-ui",
				start_url: "/",
				short_name: "Ruba",
				name: "Cuenta con Ruba",
				background_color: "#FFFFFF",
				theme_color: "#181818",
			},
		},
		{
			resolve: "gatsby-plugin-remove-console",
			options: {
				exclude: ["error", "info", "warn"],
			},
		},
	],
};
