import { ThemeProvider } from "styled-components/native";
import { defaultTheme } from "../theme";

export function DefaultThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ThemeProvider theme={defaultTheme}>{children}</ThemeProvider>;
}
