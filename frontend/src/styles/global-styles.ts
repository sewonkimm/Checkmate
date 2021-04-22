import { createGlobalStyle } from 'styled-components';
import { normalize } from 'styled-normalize';

export const GlobalStyle = createGlobalStyle`
    ${normalize}

    html,
    body {
        padding: 0;
    }
    * {
        box-sizing: border-box;
    }
`;
