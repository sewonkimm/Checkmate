/*
App.tsx
: react-router가 등록되어있습니다. 각 라우터로 분기시켜주는 파일입니다.
*/

import React, { ReactElement } from 'react';
import { Route, Switch } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import theme from './styles/theme';

import Home from './Home/Index';
import Register from './Register/Index';
import Login from './Login/Index';
import QuestionWrite from './QuestionWrite';

const App = (): ReactElement => {
  return (
    <ThemeProvider theme={theme}>
      {/* ThemeProvider는 theme.ts에서 지정한 테마입니다. */}
      <Switch>
        {/* Switch 는 첫번째로 매칭되는 path 를 가진 컴포넌트를 렌더링 시킵니다. */}
        <Route exact path="/" component={Home} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route path="/question/write" component={QuestionWrite} />
      </Switch>
    </ThemeProvider>
  );
};

export default App;
