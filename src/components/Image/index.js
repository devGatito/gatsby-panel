import React, { useRef, useEffect } from "react";
import { Wrapper } from "./styles";

function Image({
	url,
	name,
	fit = "contain",
	imagePosition,
	imageRadius,
	children,
	...props
}) {
	const ref = useRef();

	useEffect(() => {
		if (!ref.current) return;
		const observer = new IntersectionObserver(
			(entries) => {
				const entry = entries[0];
				if (entry.isIntersecting) {
					let lazyImage = entry.target;
					lazyImage.src = lazyImage.dataset.src;
					lazyImage.classList.add("load");
					observer.unobserve(lazyImage);
				}
			},
			{
				threshold: 0.2,
			},
		);
		observer.observe(ref.current);
		return () => ref?.current && observer.unobserve(ref?.current);
	}, [ref, url]);

	return (
		<Wrapper {...props}>
			{children}
			<img
				ref={ref}
				className="lazy"
				loading="lazy"
				width={1}
				height={1}
				data-src={url}
				alt={name || "image property of evo clinics"}
				style={{
					objectFit: fit,
					objectPosition: imagePosition || "center",
					imageRadius: imageRadius || 0,
				}}
			/>
		</Wrapper>
	);
}

export default Image;
