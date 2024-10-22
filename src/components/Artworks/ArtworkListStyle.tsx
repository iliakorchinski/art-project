import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const List = styled.ul`
  padding: 0 10%;
  display: flex;
  flex-direction: row;
  column-gap: 60px;
  list-style-type: none;
`;

export const ListItem = styled.li`
  width: 33%;
  height: 500px;
`;

export const Anchor = styled(Link)`
  display: inline-block;
  position: relative;
  width: 100%;
  height: 100%;
`;

export const Image = styled.img`
  object-fit: cover;
  width: 100%;
  height: 100%;
`;

export const InformationContainer = styled.div`
  position: absolute;
  top: 400px;
  left: 20px;
  width: 80%;
  height: 132px;
  background-color: white;
  border: 1px solid #f0f1f1;
`;

export const InformationParagraph1 = styled.p`
  text-decoration: none;
  margin-left: 24px;
  font-weight: 500;
  font-size: 17px;
  color: #393939;
`;
export const InformationParagraph2 = styled.p`
  text-decoration: none;
  margin-left: 24px;
  font-weight: 400;
  font-size: 15px;
  color: #e0a449;
`;
export const InformationParagraph3 = styled.p`
  text-decoration: none;
  margin-left: 24px;
  font-weight: 700;
  font-size: 15px;
  color: #393939;
`;

export const ButtonContainer = styled.p`
  z-index: 100;
  width: 35px;
  height: 35px;
  position: absolute;
  top: 50%;
  left: 60%;
`;

export const Button = styled.button`
  padding: 0;
  border: none;
`;
