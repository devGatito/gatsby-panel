import styled from 'styled-components';

// Estilos principales del modal
export const ModalWrapper = styled.div`
  width: 600px;
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  position: relative;
`;

// Encabezado del modal
export const ModalHeader = styled.h2`
  margin: 0;
  padding-bottom: 20px;
  font-size: 1.5rem;
`;

// Contenido principal del modal
export const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
`;

// Grupo de inputs (KRM y Validar botón)
export const InputGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

// Estilo para el input
export const Input = styled.input`
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  flex: 1;
`;

// Botón genérico
export const Button = styled.button`
  padding: 10px 15px;
  border-radius: 5px;
  background-color: black;
  color: white;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: #333;
  }
`;

// Texto de advertencia
export const WarningText = styled.p`
  color: #f1c40f;
  font-size: 0.9rem;
  margin-top: 10px;
  margin-bottom: 20px;
`;

// Sección de datos asociados
export const DataSection = styled.div`
  margin-top: 20px;
  h4 {
    font-size: 1.2rem;
    margin-bottom: 10px;
  }
  div {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
    span {
      background-color: #f5f5f5;
      padding: 5px 10px;
      border-radius: 5px;
      font-size: 0.9rem;
    }
  }
`;

// Fila de datos
export const DataRow = styled.div`
  display: flex;
  gap: 10px;
`;

// Columna de datos
export const DataColumn = styled.div`
  flex: 1;
`;

// Grupo de botones de acción
export const ActionButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 20px;
`;

// Botón de acciones específicas
export const ActionButton = styled(Button)`
  background-color: ${props => props.type === 'update' ? '#3498db' : '#e74c3c'};
  &:hover {
    background-color: ${props => props.type === 'update' ? '#2980b9' : '#c0392b'};
  }
`;
