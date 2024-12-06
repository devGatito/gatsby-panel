import styled from 'styled-components';

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
