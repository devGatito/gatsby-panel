import React from "react";
import { Svg } from "@components";
import { Radio, Label, WrapRadio } from "./styles";

// import radioEmpty from "@assets/icons/radio-empty.svg";
// import radioFill from "@assets/icons/radio-fill.svg";

const RadioComponent = ({
	children,
	name,
	id,
	getValue,
	value,
	selected = false,
}) => {
	const handleOnChange = (checked) => {
		getValue && getValue({ checked, value });
	};
	return (
		<WrapRadio>
			<Label htmlFor={id}>
				<Radio
					checked={selected}
					type="radio"
					id={id}
					name={name}
					onChange={({ target }) => handleOnChange(target.checked)}
					value={value}
				/>

				{/* <Svg id="checked" icon={radioFill} wsvg={24} mr={10} />
				<Svg id="empty" icon={radioEmpty} wsvg={24} mr={10} /> */}
				{children}
			</Label>
		</WrapRadio>
	);
};

export default RadioComponent;
