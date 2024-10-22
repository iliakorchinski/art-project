import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Header = styled.header`
  position: relative;
  width: 100%;
  height: 6rem;
  background-image: linear-gradient(
    to left,
    #343333 17%,
    #484848 59%,
    #282828 99%
  );
`;
export const Container = styled.div`
  position: absolute;
  top: 50%;
  right: 300px;
  display: flex;
  flex-direction: row-reverse;
  column-gap: 16px;
`;

export const LinkContainer = styled.p`
  margin: 0;
`;
export const Anchor = styled(Link)`
  text-decoration: none;
  color: white;
`;
