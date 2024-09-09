import { TextProps } from "react-native";
import styled, { DefaultTheme } from "styled-components/native";

interface CustomTextProps extends TextProps {
  color?: keyof DefaultTheme["colors"];
  size?: keyof DefaultTheme["fontSizes"];
  fontType?: keyof DefaultTheme["fonts"]["poppins"];
}

export const StyledText = styled.Text<CustomTextProps>`
  font-family: ${({ theme, fontType = "regular" }) =>
    theme.fonts.poppins[fontType]};
  font-size: ${({ theme, size = "medium" }) => theme.fontSizes[size]};
  color: ${({ theme, color = "primary" }) => theme.colors[color]};
`;
