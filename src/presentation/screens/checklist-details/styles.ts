import styled from "styled-components/native";

export const FormWrapper = styled.View`
  width: 100%;
  flex: 1;
  padding: ${({ theme }) => theme.spacing.medium};
  padding-bottom: ${({ theme }) => theme.spacing.large};
`;
