import { DefaultTheme } from 'styled-components';

const fontSizes = {
  h1: '60px',
  h2: '48px',
  h3: '36px',
  title: '24px',
  body: '18px',
};

const colors = {
  black: '#000000',
  white: '#FFFFFF',
  whiteF4: '#F4F4F4',
  whiteF7: '#F7F7F7',
  whiteD9: '#D9D9D9',
  primary: '#0F16F8',
  secondary: '#038EFC',
  accent: '#F600E1',
};

const deviceSizes = {
  mobileS: '320px',
  mobileM: '375px',
  mobileL: '450px',
  tablet: '768px',
  pc: '1024px',
};

const device = {
  mobileS: `only screen and (max-width: ${deviceSizes.mobileS})`,
  mobileM: `only screen and (max-width: ${deviceSizes.mobileM})`,
  mobileL: `only screen and (max-width: ${deviceSizes.mobileL})`,
  tablet: `only screen and (max-width: ${deviceSizes.tablet})`,
  pc: `only screen and (max-width: ${deviceSizes.pc})`,
};

const theme: DefaultTheme = {
  fontSizes,
  colors,
  device,
};

export default theme;
// 위의 theme은 ThemeProvider를 이용해서 APP에서 적용 가능
