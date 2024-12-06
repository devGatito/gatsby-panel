import React, { useEffect, useState } from "react";
import { CheckInput, WrapCheck, Label } from "./styles"; // Importa tus estilos

const CheckComponent = ({
	children,
	name,
	id,
	getValue,
	value,
	disabled,
	selected = null,
	...props
}) => {
	const [checked, setChecked] = useState(false);

	useEffect(() => {
		if (selected !== null) {
			setChecked(selected);
		}
	}, [selected]);

	const handleOnChange = (checked) => {
		setChecked(checked);
		getValue && getValue({ checked, value });
	};

	return (
		<WrapCheck disabled={disabled} {...props}>
			<CheckInput
				type="checkbox"
				id={id}
				name={name}
				disabled={disabled}
				onChange={({ target }) => handleOnChange(target.checked)}
				value={value}
				checked={checked}
			/>
			<Label htmlFor={id}>
				<span id="empty">◻️</span>
				<span id="checked">✅</span>
				{children}
			</Label>
		</WrapCheck>
	);
};

export default CheckComponent;
