// SimpleImage.js
import React from "react";
import { Imagen } from "./styles.js"; 


const ImageUrna = ({ src, alt, fit, radius, position, onClick }) => {
  return (
    <Imagen>
      <img 
        src={src} 
        alt={alt} 
        style={{ 
          objectFit: fit, 
          borderRadius: radius, 
          position 
        }} 
        onClick={onClick} 
      />
    </Imagen>
  );
};

export default ImageUrna;
