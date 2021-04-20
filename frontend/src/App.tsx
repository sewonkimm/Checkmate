import React from 'react';
import { Route, Switch } from 'react-router-dom';

import './App.css';

import {ThemeProvider} from 'styled-components'
import {theme} from './styles/theme'

import Home from './Home'
import Register from './Member/Register'

const App: React.FC = () => {
  return (
    // ThemeProvide 가 theme.ts에서 지정한 테마
    // switch는 라우터 감싸는 태그로 리액트 라우터에서 사용
    <ThemeProvider theme={theme}>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/register" component={Register} />
      </Switch>
    </ThemeProvider>
  );
};

export default App;
