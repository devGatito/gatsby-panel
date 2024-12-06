// HighlightedText.js
import React from 'react';
import styled from 'styled-components';

const HighlightedTextWrapper = styled.span`
 background: linear-gradient(to bottom, #B21F1A 0%, #DC1D16 100%);
  color: white;
  padding: 10px;
  border-radius: 5px;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
`;

const HighlightedText = ({ children }) => {
  return <HighlightedTextWrapper>{children}</HighlightedTextWrapper>;
};

export default HighlightedText;
