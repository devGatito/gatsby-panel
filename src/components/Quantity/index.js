import React, { useState, useEffect } from "react";
import { Text, Svg } from "@components";
import { Label, Button, Quantity, QuantityWrapper } from "./styles";

// import aleft from "@assets/icons/aleft.svg";
// import aright from "@assets/icons/aright.svg";
// import rollback from "@assets/icons/rollback.svg";

const QuantityComponent = ({
	max = 10,
	step = 1,
	value = 1,
	getValue,
	children,
	...props
}) => {
	const [count, setCount] = useState(1);

	const rest = () => {
		const v = count - step > 0 ? count - step : step;
		setCount(v);
	};

	const add = () => {
		const v = count + step < max ? count + step : max;
		setCount(v);
	};

	const reset = () => setCount(1);
	useEffect(() => {
		count > 1 && getValue && getValue(count);
	}, [count]);

	useEffect(() => {
		value && setCount(value);
	}, [value]);

	return (
		<>
			{!!children && <Text fs={18}>{children}</Text>}
			<Quantity {...props}>
				<QuantityWrapper>
					<Button theme="link" onClick={() => rest()}>
						{/* <Svg icon={aleft} wsvg={20} /> */}
					</Button>
					<Label>{count}</Label>
					<Button theme="link" onClick={() => add()}>
						{/* <Svg icon={aright} wsvg={20} /> */}
					</Button>
					{count > 1 && (
						<Button
							theme="link"
							onClick={() => reset()}
							style={{ right: "-2rem" }}
						>
							{/* <Svg icon={rollback} wsvg={20} /> */}
						</Button>
					)}
				</QuantityWrapper>
			</Quantity>
		</>
	);
};

export default QuantityComponent;
