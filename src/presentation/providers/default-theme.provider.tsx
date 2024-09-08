import { ThemeProvider } from "styled-components/native";

export const theme = {
  colors: {
    primary: "#000",
    secondary: "#fff",
  },
  fonts: {
    poppins: {
      light: "Poppins_300Light",
      regular: "Poppins_400Regular",
      medium: "Poppins_500Medium",
      bold: "Poppins_700Bold",
    },
  },
  fontSizes: {
    small: "12px",
    medium: "14px",
    large: "16px",
  },
};

export function DefaultThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
