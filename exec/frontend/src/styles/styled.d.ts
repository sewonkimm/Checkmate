import 'styled-components';

type fontSize = {
  h1: string;
  h2: string;
  h3: string;
  title: string;
  body: string;
};

type colors = {
  black: string;
  white: string;
  whiteF4: string;
  whiteF7: string;
  whiteD9: string;
  primary: string;
  secondary: string;
  accent: string;
};

type deviceSizes = {
  mobileS: string;
  mobileM: string;
  mobileL: string;
  tablet: string;
  pc: string;
};

type device = {
  mobileS: string;
  mobileM: string;
  mobileL: string;
  tablet: string;
  pc: string;
};
declare module 'styled-components' {
  // ThemeProvider theme에 적용할 타입으로, theme의 속성과 동일하게 작성

  export interface DefaultTheme {
    fontSizes: fontSize;
    colors: colors;
    device: device;
  }
}
