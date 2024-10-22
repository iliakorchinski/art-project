import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  column-gap: 20px;
  align-items: center;
  justify-content: center;
`;

export const ImageContainer = styled.div`
  width: 50%;
  heigth: 100%;
`;

export const Image = styled.img`
  object-fit: cover;
  width: 100%;
  height: 100%;
`;

export const InfoContainer = styled.div`
  width: 50%;
  heigth: 100%;
`;

export const Span = styled.span`
  color: #f17900;
`;
