import styled from "styled-components/native";

export const Separator = styled.View`
  height: 10px;
  width: 100%;
`;

export const ErrorWrapper = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  align-self: center;
  padding: ${({ theme }) => theme.spacing.large};
  margin-top: ${({ theme }) => theme.spacing.large};
`;

export const AddButtonWrapper = styled.View`
  position: absolute;
  bottom: 40px;
  right: 30px;
  z-index: 1000;
`;
