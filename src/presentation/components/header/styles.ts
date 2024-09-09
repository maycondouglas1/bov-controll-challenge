import styled from "styled-components/native";

export const Container = styled.View<{ align: "center" | "left" }>`
  flex-direction: row;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.primary};
  justify-content: ${({ align }) =>
    align === "left" ? "flex-start" : "center"};
  padding: ${({ theme }) => theme.spacing.medium};
  width: 100%;
`;

export const BackButton = styled.TouchableOpacity`
  padding: ${({ theme }) => theme.spacing.small};
`;

export const Content = styled.View`
  justify-content: center;
  align-items: center;
  align-self: center;
`;
