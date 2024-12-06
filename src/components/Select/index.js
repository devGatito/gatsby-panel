import React, { useState, useEffect } from "react";
import arrow from "@assets/icons/CaretDown.svg";
import {
	WrappInput,
	Select,
	Label,
	ErrorMessage,
	WarningMessage,
	IconFinger,
} from "./styles";
import { slugify } from "@root/src/utils";
import Svg from "../Svg";

const customSelect = ({
	options,
	id,
	defaultValue = "",
	otherLess = false,
	excludes,
	placeholder = "",
	getValue,
	value = "",
	error = "",
	warning = "",
	disabled = false,
	hasRequired = false,
	onFocus,
	...props
}) => {
	const [exclusions, setExclusions] = useState([]);
	const [hasFocus, setHasFocus] = useState(false);

	useEffect(() => {
		if (excludes) {
			const idsExcludes = excludes.map((item) => item.id);
			setExclusions(idsExcludes);
		}
	}, [excludes]);

	const handleFocus = () => {
		if (onFocus) onFocus();
		setHasFocus(true);
	};

	const handleChange = (e) => {
		const newValue = e.target.value;
		if (getValue) getValue(newValue);
	};

	return (
		<WrappInput
			{...props}
			hasFocus={hasFocus}
			hasError={!!error}
			hasWarning={!!warning}
			disabled={disabled}
		>
			<Select
				id={id}
				value={value}
				disabled={disabled}
				required={hasRequired}
				onFocus={handleFocus}
				onChange={handleChange}
				onBlur={() => setHasFocus(false)}
				defaultValue={defaultValue}
			>
				<option value="" disabled></option>
				{options &&
					options.map((option, key) => (
						<option
							key={key}
							value={option.id}
							disabled={exclusions.includes(option.id)}
						>
							{option.name}{" "}
							{exclusions.includes(option.id) ? "(disabled)" : ""}
						</option>
					))}
				{!otherLess && <option value="9999">Other</option>}
			</Select>
			<IconFinger>
				<Svg icon={arrow} wsvg={16} />
			</IconFinger>
			{hasRequired && (
				<Label hasFocus={true} disabled={disabled} right>
					Required
				</Label>
			)}

			{placeholder && (
				<Label hasFocus={hasFocus || !!value} disabled={disabled}>
					{placeholder}
				</Label>
			)}
			{error && <ErrorMessage>{error}</ErrorMessage>}
			{warning && <WarningMessage>{warning}</WarningMessage>}
		</WrappInput>
	);
};

export default customSelect;
