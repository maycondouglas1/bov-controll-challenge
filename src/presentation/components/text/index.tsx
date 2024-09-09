import { TextProps } from "react-native";
import { DefaultTheme } from "styled-components/native";
import { StyledText } from "./styles";

interface AppTextProps extends TextProps {
  color?: keyof DefaultTheme["colors"];
  size?: keyof DefaultTheme["fontSizes"];
  fontType?: keyof DefaultTheme["fonts"]["poppins"];
  text: string;
}

export function AppText({ text, ...props }: AppTextProps) {
  return <StyledText {...props}>{text}</StyledText>;
}
