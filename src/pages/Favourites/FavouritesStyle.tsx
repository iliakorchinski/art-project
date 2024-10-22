import styled from 'styled-components';

export const Container = styled.ul`
  display: grid;
  grid-template-areas: 'a b c';
`;

export const Item = styled.li`
  position: relative;
  padding-left: 20px;
  list-style: none;
  width: 70%;
  background-color: #f5f5f5;
`;

export const ButtonContainer = styled.p`
  position: absolute;
  top: 20%;
  left: 80%;
`;

export const Button = styled.button`
  width: 30px;
  height: 30px;
  padding: 0;
  border: none;
`;

export const Image = styled.img`
  width: 100%;
`;
