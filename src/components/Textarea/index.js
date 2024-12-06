import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import {
	WrappInput,
	ItemInput,
	Label,
	Label2,
	ErrorMessage,
	WarningMessage,
	IconFinger,
} from "./styles";
import { REGEX } from "@constants";

import { Svg } from "@components";
// import fingerIcon from "@assets/icons/finger.svg";
// import keyIcon from "@assets/icons/key.svg";
// import rollback from "@assets/icons/rollback.svg";
import { randomKey, slugify } from "@src/utils";

const TextareaComponent = ({
	placeholder,
	type,
	getValue,
	mask,
	value,
	forwardRef,
	onKeyDown,
	onKeyUp,
	onChange,
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
	isCurp,
	onlyNL,
	onlyPositiveNumbers,
	readonly,
	capitalize,
	hasRequired,
}) => {
	const componentId = randomKey(5);
	const [hasFocus, setHasFocus] = useState(false);
	const [localError, setLocalError] = useState("");
	const [localWarning, setLocalWarning] = useState("");
	const [showPasswd, setShowPasswd] = useState(false);
	const { emailRgx, curpRgx, specialChars, onlyLetterNumbers } = REGEX;

	const handleChange = (e) => {
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
			//permite guion
			value = value.replace(
				/[$&\\+:·,;=¬?´@¿¡ç#|'"/`|°¨<>_^*()%![\]}+~{]/g,
				"",
			);
		}

		if (onlyNL) {
			value = value.replace(onlyLetterNumbers, "");
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

		onChange && onChange(value);
		if (getValue) {
			maxLength
				? getValue(
						value.length > maxLength
							? value.slice(0, maxLength)
							: value,
					)
				: getValue(value);
		}
	};

	const handleFocus = () => {
		onFocus && onFocus();
		setHasFocus(true);
	};

	const handleCopy = (e) => {
		if (onCopy) e.preventDefault();
	};
	const handlePaste = (e) => {
		if (onPaste) e.preventDefault();
	};

	return (
		<WrappInput
			small={!placeholder}
			hasFocus={hasFocus}
			hasError={error.length || localError.length}
			hasWarning={warning.length}
			disabled={disabled}
		>
			<ItemInput
				readonly={readonly}
				onFocus={() => handleFocus()}
				onBlur={() => setHasFocus(false)}
				value={value}
				ref={forwardRef}
				onChange={handleChange}
				onKeyDown={onKeyDown}
				onKeyUp={onKeyUp}
				onPaste={handlePaste}
				onCopy={handleCopy}
				disabled={disabled}
				maxLength={maxLength}
				min={isNumber ? "0" : null}
				max={isNumber ? "9" : null}
				autoComplete="off"
				id={slugify(placeholder)+componentId}
				name={slugify(placeholder)+componentId}
			/>

			{!!value && (
				<IconFinger
					className="actionButton"
					style={{ right: type === "password" ? "2.5rem" : "0.5rem" }}
				>
					{/* <Svg
						onClick={() => getValue("")}
						icon={rollback}
						wsvg={22}
					/> */}
				</IconFinger>
			)}
			{placeholder && (
				<Label
					htmlFor={slugify(placeholder)+componentId}
					hasFocus={hasFocus || (!!value && value.length)}
					disabled={disabled}
				>
					{placeholder}
				</Label>
			)}
			{hasRequired && (
				<Label2
					hasFocus={true}
					disabled={disabled}
					right
				>
					Required
				</Label2>
			)}
			{error && <ErrorMessage>{error}</ErrorMessage>}
			{warning && <WarningMessage>{warning}</WarningMessage>}
			{localWarning && <WarningMessage>{localWarning}</WarningMessage>}
			{localError && <ErrorMessage>{localError}</ErrorMessage>}
		</WrappInput>
	);
};

TextareaComponent.defaultProps = {
	error: "",
	warning: "",
};

TextareaComponent.propTypes = {
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
};

export default TextareaComponent;
