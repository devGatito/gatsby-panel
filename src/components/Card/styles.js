import styled from 'styled-components';

export const CardWrapper = styled.div`
  background: #ffffff;
  border-radius: 10px;
  border: 2px solid #F15660;
  padding: 20px;
  text-align: center;
  width: 100%;
  max-width: 300px;
  margin: 10px auto;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media (max-width: 600px) {
    width: 90%; // Ajustar ancho en móviles
    margin: 10px auto; // Alinear el margen
  }
`;
export const InfoWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 30px;

  @media (max-width: 600px) {
    flex-direction: column; // Cambiar a columna en móviles
  }
`;
