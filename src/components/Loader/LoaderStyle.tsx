/* HTML: <div class="loader"></div> */

import styled from 'styled-components';

export const Load = styled.div`
  width: 50px;
  margin: 0 auto;
  aspect-ratio: 1;
  border-radius: 50%;
  border: 8px solid lightblue;
  border-right-color: orange;
  animation: l2 1s infinite linear;
  @keyframes l2 {
    to {
      transform: rotate(1turn);
    }
  }
`;
