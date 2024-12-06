import React from "react";
import { WrappTooltip, TooltipContent } from "./styles";
import { Svg } from "@components";

// import tooltip from "@assets/icons/info.svg";

const icons = {
	info: null,
};

const Tooltip = ({
	element,
	children,
	w,
	direction,
	delay = 150,
	icon,
	widthIcon = 20,
}) => {
	const fileIcon = icons[icon];
	
	return (
		<WrappTooltip>
			{element && element}
			{/* {icon && <Svg icon={fileIcon} wsvg={widthIcon} />} */}
			{children && (
				<TooltipContent
					className="content"
					delay={delay}
					direction={direction || "top"}
					w={w || 200}
				>
					<small style={{ fontWeight: 300 }}>{children}</small>
				</TooltipContent>
			)}
		</WrappTooltip>
	);
};

export default Tooltip;
