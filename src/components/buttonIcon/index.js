import React from "react";
import { Base } from "./styles";
import { Loader, Svg, Tooltip, Text } from "@components";

import trashw from "@assets/icons/trashw.svg";
import trash from "@assets/icons/trash.svg";
import refresh from "@assets/icons/ArrowsCounterClockwise.svg";
import enable from "@assets/icons/enable.svg";
import disable from "@assets/icons/disable.svg";

const dataIcon = {
	//arrowLine
	trash,
	trashw,
	refresh,
	enable,
	disable,
};

const ButtonIcon = ({
	children,
	mobile,
	loading,
	icon,
	direction,
	w,
	widthTooltip,
	sizeIcon,
	tooltip,
	small,
	name,
	width,
	nohover,
	...props
}) => {
	return (
		<>
			{tooltip && (
				<Tooltip
					direction={direction}
					w={widthTooltip}
					element={
						<Base
							nohover={nohover}
							w={width}
							small={small}
							icon={icon}
							name={name}
							aria-label={name}
							{...props}
						>
							{loading && <Loader w={20} />}
							{icon && <Svg icon={dataIcon[icon]} wsvg={w} />}
						</Base>
					}
				>
					<Text size={12} weight="500" align="center">
						{tooltip}
					</Text>
				</Tooltip>
			)}

			{!tooltip && (
				<Base
					nohover={nohover}
					w={width}
					icon={icon}
					{...props}
					name={name}
					aria-label={name}
				>
					{loading && <Loader w={w} />}
					{icon && <Svg icon={dataIcon[icon]} wsvg={w} />}
				</Base>
			)}
		</>
	);
};

export default ButtonIcon;
