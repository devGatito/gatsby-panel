import React from "react";
import { Base, BaseLink } from "./styles";
import { Loader } from "@components";

const Button = ({
	children,
	type,
	forwardRef,
	mobile,
	loading,
	theme,
	name,
	...props
}) => {
	const Wrapper = type === "link" ? BaseLink : Base;
	return (
		<Wrapper
			{...props}
			ref={forwardRef}
			theme={theme}
			mobile={mobile}
			loading={loading}
			type={"button"}
			aria-label={
				typeof children === "string" ? children : name || "boton"
			}
			centered
		>
			{loading && <Loader className="loader-button" w={22} whited />}
			{loading && <span>{children}</span>}
			{!loading && children}
		</Wrapper>
	);
};

export default Button;
