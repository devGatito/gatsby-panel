import React, { useState, useEffect } from "react";
import { Flex, Col, ButtonIcon, Text, Svg, Image } from "@components";
import { Portal, PortalHeader, PortalButton } from "./styles";

// import aleft from "@assets/icons/aleft.svg";
// import aright from "@assets/icons/aright.svg";

const ViewerComponent = ({ show, files, currentImg, onClose, hideInfo, typeURL }) => {
	const [active, setActive] = useState(0);
	const [limit, setLimit] = useState(0);

	const next = () => {
		const c = active + 1;
		setActive(c < limit ? c : limit);
	};

	const prev = () => {
		const c = active - 1 > 0 ? active - 1 : 0;
		setActive(c);
	};

	const handleClose = () => {
		setActive(0);
		onClose();
	};

	useEffect(() => {
		setLimit(files.length - 1);
	}, [files]);

	useEffect(() => {
		setActive(currentImg);
	}, [currentImg]);

	return (
		<Portal show={show} current={active}>
			<PortalHeader>
				<Flex items="center" justify="between">
					{!hideInfo && (
						<Col>
							<Text xsSize={18} mdSize={26} weight="500">
								{files.length || 0} For upload files
							</Text>
						</Col>
					)}
					{hideInfo && <span></span>}
					<Col>
						<ButtonIcon
							tooltip="Back"
							direction="bottom"
							pill
							w={30}
							width={50}
							icon="close"
							widthTooltip={50}
							onClick={() => handleClose()}
						/>
					</Col>
				</Flex>
			</PortalHeader>

			<Flex
				items="center"
				align="center"
				justify="center"
				flexWrap="wrap"
				position="relative"
			>
				{active > 0 && (
					<PortalButton
						onClick={() => prev()}
						xsLeft="6%"
						mdLeft="25%"
					>
						{/* <Svg icon={aleft} wsvg={30} /> */}
					</PortalButton>
				)}

				<Col minw="50%" xsWidth="90%" mdWidth="50%">
					<Flex align="center" items="center" content="center">
						<Flex
							id="slide"
							maxw="100%"
							ml={`-${active}00%`}
							width={`${files.length}00%`}
						>
							{!!files.length &&
								files.map(
									(
										{
											name,
											urlObject,
											url,
											fileSize,
											type,
										},
										index,
									) => (
										<Flex
											key={index}
											justify="center"
											align="center"
											className="slide_item"
											direction="column"
											style={{
												minWidth: "100%",
												opacity:
													active === index ? 1 : 0.5,
												transform:
													active === index
														? "scale(1)"
														: "scale(0.7)",
											}}
										>
											{[
												"video/mp4",
												"video/avi",
											].includes(type) && (
												<video
													style={{
														height: "450px",
														maxHeight: "450px",
														objectFit: "contain",
													}}
													controls
												>
													<source
														src={urlObject}
														type={type}
													/>
												</video>
											)}

											{[
												"image/jpeg",
												"image/jpg",
												"image/png",
												"image/webp",
											].includes(type) && (
												<Image
													alt=""
													loading="lazy"
													url={urlObject}
													fit="contain"
													style={{
														width: "100%",
														height: "80vh",
														maxHeight: "700px",
													}}
												/>
											)}

											{typeURL === "webp" && (
												<Image
													alt=""
													url={url}
													fit="contain"
													loading="lazy"
													style={{
														width: "100%",
														height: "80vh",
														maxHeight: "700px",
													}}
												/>
											)}

											{!hideInfo && (
												<Text
													size={14}
													weight="500"
													align="center"
													className="p:1"
												>
													{name} -{" "}
													{fileSize.formatedSize}
												</Text>
											)}
										</Flex>
									),
								)}
						</Flex>
					</Flex>
				</Col>

				{active !== limit && (
					<PortalButton
						xsRight="6%"
						mdRight="25%"
						onClick={() => next()}
					>
						{/* <Svg icon={aright} wsvg={30} /> */}
					</PortalButton>
				)}
			</Flex>
		</Portal>
	);
};

export default React.memo(ViewerComponent);
