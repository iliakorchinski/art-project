import styled from 'styled-components';

export const PaginationContainer = styled.div`
  margin-top: 70px;
  margin-bottom: 30px;
  display: flex;
  flex-direction: row;
  column-gap: 10px;
  justify-content: center;
  align-items; center;
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  column-gap: 5px;
`;

export const ArrowButton = styled.button`
  border: none;
  background-color: white;
`;

export const Button = styled.button`
  border: 0px;
  border-radius: 4px;
  background-color: ${({ disabled }) => (disabled ? '#F17900' : 'white')};
  color: ${({ disabled }) => (disabled ? 'white' : 'black')};
`;
