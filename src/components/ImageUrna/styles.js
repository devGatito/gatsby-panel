import styled from "styled-components";

export const Imagen = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px;
  
  img {
    width: 80%;
    max-width: 354px;
    height: auto;
    object-fit: ${({ fit }) => fit || 'cover'};
    border-radius: ${({ radius }) => radius || '0'};
    position: ${({ position }) => position || 'static'};
    
    @media (max-width: 600px) {
      max-width: 200px; // Ajustar el tamaño de la imagen en móviles
    }
  }
`;
