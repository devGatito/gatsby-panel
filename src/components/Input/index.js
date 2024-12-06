import React, { useState } from "react";
import PropTypes from "prop-types";
import {
	WrappInput,
	ItemInput,
	Label,
	ErrorMessage,
	WarningMessage,
	IconFinger,
	Label2,
} from "./styles";
import { REGEX } from "@constants";
import { normalize } from "@utils";
import { randomKey, slugify } from "@src/utils";

import finger from "@assets/icons/finger.svg";
import Svg from "../Svg";

const InputComponent = ({
	isSlug,
	placeholder,
	type,
	getValue,
	mask,
	value,
	forwardRef,
	onKeyDown,
	onKeyUp,
	onChange,
	onBlur,
	onFocus,
	onCopy,
	onPaste,
	error,
	warning,
	disabled,
	maxLength,
	isNumber,
	scapeCharacters,
	onlyCharaters,
	onlyAlpha,
	normalizer,
	isCurp,
	onlyNL,
	onlyPositiveNumbers,
	readonly,
	capitalize,
	hasRequired,
	align,
	...props
}) => {
	const componentId = randomKey(5);
	const [hasFocus, setHasFocus] = useState(false);
	const [localError, setLocalError] = useState("");
	const [localWarning, setLocalWarning] = useState("");
	const [showPasswd, setShowPasswd] = useState(false);
	const { emailRgx, curpRgx, specialChars, onlyLetterNumbers, onlySlug } =
		REGEX;

	const handleChange = (e) => {
		if (!e || !e.target) return;

		const { type } = e.target;
		let { value } = e.target;

		if (onlyAlpha) {
			value = value.replace(
				/[0-9$&\\+:·,.;=¬?´@¿¡ç#|'"/`|°¨<>_^*()%![\]}+~{-]/g,
				"",
			);
		}

		if (scapeCharacters) {
			value = value.replace(specialChars, "");
		}

		if (onlyCharaters) {
			value = value.replace(
				/[$&\\+:·,;=¬?´@¿¡ç|'"/`|°¨<>_^*()%![\]}+~{]/g,
				"",
			);
		}

		if (onlyNL) {
			value = value.replace(onlyLetterNumbers, "");
		}

		if (isSlug) {
			value = value.replace(onlySlug, "").replace(/ /g, "-");
		}

		if (onlyPositiveNumbers) {
			const valid = /^[1-9]$|^[1-9][0-9]$|^(100)$/.test(value);
			if (!valid) value = value.slice(0, -1);
		}

		if (type === "email") {
			const valid = emailRgx.test(value);
			setLocalError(
				valid || value.length === 0 ? "" : "Formato no válido",
			);
		}

		if (isCurp) {
			const valid = curpRgx.test(value);
			setLocalError(valid || value.length === 0 ? "" : "Curp no válido");
		}

		if (capitalize) {
			value = value
				.toLowerCase()
				.replace(/\w/, (firstLetter) => firstLetter.toUpperCase());
		}

		if (normalizer) {
			value = normalize(value);
		}

		if (onChange) {
			onChange(value);
		}

		if (getValue) {
			const trimmedValue = value.trimStart();
			if (maxLength) {
				getValue(
					trimmedValue.length > maxLength
						? trimmedValue.slice(0, maxLength)
						: trimmedValue,
				);
			} else {
				getValue(trimmedValue);
			}
		}
	};

	const handleBlur = (e) => {
		const value = e.target.value.trimStart().trim();
		getValue && getValue(value);
		onBlur && onBlur();
		setHasFocus(false);
	};

	const handleFocus = () => {
		onFocus && onFocus();
		setHasFocus(true);
	};

	const handleCopy = (e) => {
		if (onCopy) {
			onCopy(e);
		} else {
			// e.preventDefault();
		}
	};

	const handlePaste = (e) => {
		if (onPaste) {
			onPaste(e);
		} else {
			// e.preventDefault();
		}
	};

	return (
		<WrappInput
			{...props}
			hasFocus={hasFocus}
			small={!placeholder}
			hasError={error.length || localError.length}
			hasWarning={warning.length || localWarning.length}
			disabled={disabled}
		>
			<ItemInput
				readonly={readonly}
				onFocus={handleFocus}
				onBlur={handleBlur}
				value={value}
				ref={forwardRef}
				onChange={handleChange}
				onKeyDown={onKeyDown}
				onKeyUp={onKeyUp}
				onPaste={handlePaste}
				onCopy={handleCopy}
				disabled={disabled}
				maxLength={maxLength}
				align={align}
				type={
					isNumber
						? "number"
						: type === "password"
							? showPasswd
								? "text"
								: "password"
							: type || "text"
				}
				min={isNumber ? "0" : null}
				max={isNumber ? "9" : null}
				autoComplete="off"
				id={slugify(placeholder) + componentId}
				name={slugify(placeholder) + componentId}
			/>
			{type === "password" && (
				<IconFinger
					className="actionButton"
					onClick={() => setShowPasswd(!showPasswd)}
				>
					<Svg icon={finger} wsvg={22} />
				</IconFinger>
			)}

			{!!value && (
				<IconFinger
					className="actionButton"
					style={{
						right: ["password", "calendar"].includes(type)
							? "2.5rem"
							: "0.5rem",
					}}
				></IconFinger>
			)}
			{placeholder && (
				<Label
					htmlFor={slugify(placeholder) + componentId}
					hasFocus={hasFocus || !!value}
					disabled={disabled}
				>
					{placeholder}
				</Label>
			)}
			{hasRequired && (
				<Label2 hasFocus={true} disabled={disabled} right>
					Required
				</Label2>
			)}
			{error && <ErrorMessage>{error}</ErrorMessage>}
			{warning && <WarningMessage>{warning}</WarningMessage>}
			{localError && <ErrorMessage>{localError}</ErrorMessage>}
			{localWarning && <WarningMessage>{localWarning}</WarningMessage>}
		</WrappInput>
	);
};

InputComponent.defaultProps = {
	error: "",
	warning: "",
};

InputComponent.propTypes = {
	placeholder: PropTypes.string,
	getValue: PropTypes.func.isRequired,
	mask: PropTypes.string,
	value: PropTypes.string.isRequired,
	disabled: PropTypes.bool,
	forwardRef: PropTypes.oneOfType([
		PropTypes.func,
		PropTypes.shape({ current: PropTypes.any }),
	]),
	onKeyDown: PropTypes.func,
	onKeyUp: PropTypes.func,
	onChange: PropTypes.func,
	onFocus: PropTypes.func,
	error: PropTypes.string,
	warning: PropTypes.string,
	hasRequired: PropTypes.bool,
	isSlug: PropTypes.bool,
	isNumber: PropTypes.bool,
	scapeCharacters: PropTypes.bool,
	onlyCharaters: PropTypes.bool,
	onlyAlpha: PropTypes.bool,
	normalizer: PropTypes.bool,
	isCurp: PropTypes.bool,
	onlyNL: PropTypes.bool,
	onlyPositiveNumbers: PropTypes.bool,
	readonly: PropTypes.bool,
	capitalize: PropTypes.bool,
	align: PropTypes.string,
};

export default InputComponent;
