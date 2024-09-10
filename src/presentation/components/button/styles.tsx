import styled from "styled-components/native";

export const ButtonWrapper = styled.View`
  width: 100%;
  height: 50px;
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: 10px;
  justify-content: center;
  align-items: center;
`;
