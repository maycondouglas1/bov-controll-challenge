import { styled } from "styled-components/native";

export const Container = styled.View`
  width: 50px;
  height: 50px;
  border-radius: 30px;
  background-color: ${({ theme }) => theme.colors.primary};
  justify-content: center;
  align-items: center;
`;
