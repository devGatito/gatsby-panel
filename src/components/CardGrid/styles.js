import styled from 'styled-components';

export const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(${props => props.columns || 4}, 1fr);
  gap: ${props => props.gap || '2rem'};
  max-width: ${props => props.maxWidth || '1200px'};
  margin: 0 auto;
  padding: ${props => props.padding || '0 1rem'};

  @media (max-width: 1024px) {
    grid-template-columns: repeat(${props => Math.max(props.columns - 1, 1)}, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(${props => Math.max(props.columns - 2, 1)}, 1fr);
    gap: ${props => props.gapSmall || '1.5rem'};
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: ${props => props.gapXSmall || '1rem'};
  }
`;
