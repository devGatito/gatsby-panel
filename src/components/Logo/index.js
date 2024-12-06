import React from "react";
import { LogoContainer, Image } from "./styles.js"; 

const Logo = ({ src, alt }) => {
  return (
    <LogoContainer>
      <Image src={src} alt={alt} />
    </LogoContainer>
  );
};

export default Logo;
