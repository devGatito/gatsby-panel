import { graphql, useStaticQuery } from "gatsby";

const defaultJsonld = {
	"@context": "https://schema.org",
	"@type": ["Corporation", "Website"],
	name: "Cuenta con Ruba",
	url: "https://cuentaconruba.mx",
	logo: "https://cuentaconruba.mx/logo.png",
	sameAs: [
		"https:/facebook.com/cuentaconruba",
		"https:/instagram.com/cuentaconruba",
	]
};

const useSiteMetadata = () => {
	const data = useStaticQuery(graphql`
		query {
			site {
				siteMetadata {
					author
					description
					image
					keywords
					agencyName
					siteUrl
					title
					typeContent
				}
			}
		}
	`);

	data.site.siteMetadata.jsonld = defaultJsonld;
	return data.site.siteMetadata;
};

export default useSiteMetadata;
