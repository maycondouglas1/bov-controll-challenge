import styled from "styled-components/native";

export const Container = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
`;

export const Content = styled.View`
  background-color: white;
  padding: ${({ theme }) => theme.spacing.medium};
  border-radius: ${({ theme }) => theme.spacing.medium};
  align-items: center;
`;

export const Gif = styled.Image`
  width: 50px;
  height: 50px;
  margin-bottom: ${({ theme }) => theme.spacing.small};
`;
