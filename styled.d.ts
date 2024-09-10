import "styled-components/native";

declare module "styled-components/native" {
  export interface DefaultTheme {
    colors: {
      primary: string;
      secondary: string;
      background: string;
      white: string;
      black: string;
      red: string;
    };
    fonts: {
      poppins: {
        light: string;
        regular: string;
        medium: string;
        bold: string;
      };
    };
    fontSizes: {
      small: string;
      medium: string;
      large: string;
    };
    spacing: {
      small: string;
      medium: string;
      large: string;
    };
  }
}
