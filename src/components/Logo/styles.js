
import styled from "styled-components"; // Asegúrate de importar styled


export const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-bottom: 30px;
  text-align: center;

  @media (max-width: 600px) {
    margin-bottom: 20px; 
  }
`;

export const Image = styled.img`
  width: 80%;
  max-width: 300px;
  height: auto;

  @media (max-width: 600px) {
    max-width: 200px;
     
  }
`;
