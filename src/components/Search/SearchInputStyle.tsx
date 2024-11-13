import styled from 'styled-components';

const color = (props: any) => props.color || '';

export const InputContainer = styled.input`
  display: block;
  margin: 0 auto;
  background-color: #ebebeb;
  border-color: ${color};
  border-radius: 16px;
  width: 30%;
  height: 40px;
  text-indent: 20px;

  @media (max-width: 420px) {
    width: 60%;
  }
`;
