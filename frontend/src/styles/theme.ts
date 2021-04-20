import {DefaultTheme} from 'styled-components'

const theme: DefaultTheme = {
    basicWidth: '320px',
  
      color: {
        main: 'cyan',
        secondary: 'magenta'
      }
  };
  export {theme}

  // 이제 위의 theme은 ThemeProvider를 이용해서 APP에서 적용 가능 