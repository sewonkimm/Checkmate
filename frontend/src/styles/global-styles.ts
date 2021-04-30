/*
global-styles.ts
: 전역 스타일 설정
*/

import { createGlobalStyle } from 'styled-components';
import { normalize } from 'styled-normalize';

// 위에서 받은 `normalize`로 기본 css가 초기화됩니다.

export const GlobalStyle = createGlobalStyle`
    ${normalize}
    
    @import url(https://fonts.googleapis.com/earlyaccess/notosanskr.css);

    html,
    body {
        margin: 0;
        padding: 0;
        font-family: "Noto Sans", "Noto Sans CJK KR", sans-serif;
        width: 100%;
        height: 100%;
    }
    * {
        box-sizing: border-box;
    }

    button {
        border: none;
        margin: 0;
        padding: 0;
        width: auto;
        overflow: visible;
        background: transparent;
        outline: none;
    }
`;
