import { Animated } from "react-native";
import styled from "styled-components/native";

export const Container = styled(Animated.View)`
  background-color: white;
  padding: ${({ theme }) => theme.spacing.medium};
  width: 100%;
  border-radius: 8px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
`;

export const ButtonsWrapper = styled.View`
  margin-top: ${({ theme }) => theme.spacing.medium};
`;
