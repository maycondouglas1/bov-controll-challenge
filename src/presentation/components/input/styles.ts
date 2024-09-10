import styled from "styled-components/native";

export const Container = styled.View`
  flex-direction: column;
`;

export const StyledInput = styled.TextInput`
  height: 40px;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.primary};
  font-family: ${({ theme }) => theme.fonts.poppins.regular};
  font-size: ${({ theme }) => theme.fontSizes.medium};
  margin-bottom: ${({ theme }) => theme.spacing.medium};
  width: 100%;
`;
