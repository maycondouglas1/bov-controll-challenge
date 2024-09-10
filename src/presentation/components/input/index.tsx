import { Feather } from "@expo/vector-icons";
import React from "react";
import { TextInputProps } from "react-native";
import { DefaultTheme } from "styled-components/native";
import { AppText } from "../text";
import { Container, StyledInput } from "./styles";

type FeatherIconName = React.ComponentProps<typeof Feather>["name"];

interface InputProps extends TextInputProps {
  label?: string;
  labelColor?: keyof DefaultTheme["colors"];
  error?: string;
}

export function AppInput({ label, labelColor, error, ...rest }: InputProps) {
  return (
    <Container>
      {label && <AppText color={labelColor}>{label}</AppText>}
      <StyledInput {...rest} />
      {error && error.length > 0 && <AppText color="red">{error}</AppText>}
    </Container>
  );
}
