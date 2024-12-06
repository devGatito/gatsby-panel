import React, { useEffect } from "react";
import { useMetaData } from "@hooks";
import icon from "@graphic/icon.png";
import defaultImage from "@assets/cover.png";

const loadFacebookPixel = () => {
	!(function (f, b, e, v, n, t, s) {
		if (f.fbq) return;
		n = f.fbq = function () {
			n.callMethod
				? n.callMethod.apply(n, arguments)
				: n.queue.push(arguments);
		};
		if (!f._fbq) f._fbq = n;
		n.push = n;
		n.loaded = !0;
		n.version = "2.0";
		n.queue = [];
		t = b.createElement(e);
		t.async = !0;
		t.src = v;
		s = b.getElementsByTagName(e)[0];
		s.parentNode.insertBefore(t, s);
	})(
		window,
		document,
		"script",
		"https://connect.facebook.net/en_US/fbevents.js",
	);

	fbq("init", "836490560292346");
	fbq("track", "PageView");
};

const Seo = ({
	title,
	description,
	pathname,
	keywords,
	siteUrl,
	typeContent,
	image,
	jsonld,
	children,
}) => {
	const {
		author,
		agencyName,
		title: defaultTitle,
		description: defaultDescription,
		siteUrl: defaultSiteUrl,
		keywords: defaultKeywords,
		typeContent: defaultTypeContent,
		jsonld: defaultJsonld,
	} = useMetaData();

	useEffect(() => {
		loadFacebookPixel();
	}, []);

	const seo = {
		author,
		agencyName,
		image: image || defaultImage,
		title: title || defaultTitle,
		url: `${siteUrl || defaultSiteUrl}${pathname || ``}`,
		canonicalUrl: `${siteUrl || defaultSiteUrl}${pathname || ``}`,
		description: description || defaultDescription,
		keywords: Array.isArray(keywords)
			? keywords
			: [keywords] || defaultKeywords,
		typeContent: typeContent || defaultTypeContent,
		jsonld: jsonld || defaultJsonld,
	};

	return (
		<>
			<meta name="google-site-verification" content="Zp9q8OmzskKaTZK5To0MBaMgU5uAYk7NQR8NiSZInzA" />
			<title>{seo.title}</title>
			<meta name="description" content={seo.description} />
			<meta
				name="keywords"
				content={seo.keywords ? seo.keywords.join(", ") : ""}
			/>
			<meta name="image" content={seo.image} />
			{/* Facebook meta tags */}
			<meta property="og:title" content={seo.title} />
			<meta property="og:url" content={seo.canonicalUrl} />
			<meta property="og:image" content={seo.image} />
			<meta property="og:type" content={seo.typeContent} />
			<meta property="og:description" content={seo.description} />
			{/* Twitter meta tags */}
			<meta name="twitter:card" content="summary_large_image" />
			<meta name="twitter:title" content={seo.title} />
			<meta name="twitter:url" content={seo.url} />
			<meta name="twitter:description" content={seo.description} />
			<meta name="twitter:image" content={seo.image} />
			<meta name="twitter:creator" content={seo.twitterUsername} />
			<link rel="canonical" href={seo.canonicalUrl} />
			<link rel="icon" href={icon} />

			<script type="application/ld+json">
				{JSON.stringify(seo.jsonld)}
			</script>
			<noscript>
				<img
					height="1"
					width="1"
					style={{ display: 'none' }}
					src="https://www.facebook.com/tr?id=836490560292346&ev=PageView&noscript=1"
				/>
			</noscript>
			{children}
		</>
	);
};

export default Seo;
