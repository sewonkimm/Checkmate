import 'styled-components'

// and extend them!
declare module 'styled-components' {
  // ThemeProvider theme에 적용할 타입으로, theme의 속성과 동일하게 작성

  export interface DefaultTheme {

    basicWidth: string;
      color: {
          main: string;
          secondary: string;
      }

  }
}