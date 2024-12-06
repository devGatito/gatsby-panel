import React, { useState, useEffect, useRef } from "react";
import {
	Slide,
	SliderContent,
	SliderWrapper,
	SlideContainer,
	NavButton,
	Dot,
	Dots,
} from "./styles";
import { Svg } from "@components";

import arrowl from "@assets/icons/ArrowLeft.svg";
import arrowr from "@assets/icons/ArrowRight.svg";

const Slider = ({
	children,
	height = 500,
	autoPlay = true,
	autoPlayTime = 3000,
	hideControls = true,
	noOverflow = false 
}) => {
	const [activeIndex, setActiveIndex] = useState(0);
	const length = React.Children.count(children);
	const timeoutRef = useRef(null);

	const nextSlide = () => {
		setActiveIndex((prevIndex) => (prevIndex + 1) % length);
	};

	const prevSlide = () => {
		setActiveIndex((prevIndex) => (prevIndex - 1 + length) % length);
	};

	useEffect(() => {
		if (autoPlay) {
			timeoutRef.current = setTimeout(nextSlide, autoPlayTime);
			return () => clearTimeout(timeoutRef.current);
		}
	}, [activeIndex, autoPlay, autoPlayTime]);

	const handleDotClick = (index) => {
		setActiveIndex(index);
	};

	const handleTouchStart = (e) => {
		const touchStartX = e.touches[0].clientX;
		e.target.ontouchmove = (e) => {
			const touchEndX = e.touches[0].clientX;
			if (touchStartX - touchEndX > 50) nextSlide();
			if (touchStartX - touchEndX < -50) prevSlide();
		};
		e.target.ontouchend = () => {
			e.target.ontouchmove = null;
		};
	};

	return (
		<SliderWrapper noOverflow={noOverflow}>
			<SliderContent activeIndex={activeIndex}>
				{React.Children.map(children, (child, index) => (
					<SlideContainer key={index} onTouchStart={handleTouchStart}>
						<Slide height={height}>{child}</Slide>
					</SlideContainer>
				))}
			</SliderContent>
			{!hideControls && (
				<>
					<NavButton left onClick={prevSlide}>
						<Svg icon={arrowl} wsvg={26} />
					</NavButton>
					<NavButton right onClick={nextSlide}>
						<Svg icon={arrowr} wsvg={26} />
					</NavButton>
				</>
			)}
			<Dots>
				{Array.from({ length }).map((_, index) => (
					<Dot
						key={index}
						active={index === activeIndex}
						onClick={() => handleDotClick(index)}
					/>
				))}
			</Dots>
		</SliderWrapper>
	);
};

export default Slider;
