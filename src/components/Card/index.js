// Card.js
import React from 'react';
import { CardWrapper,InfoWrapper } from "./styles";

const Card = ({ children, style }) => {
  return <CardWrapper style={style}>{children}</CardWrapper>;
};


export default Card;
