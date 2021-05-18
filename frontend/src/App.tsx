/* eslint-disable react-hooks/exhaustive-deps */
/*
App.tsx
: react-router가 등록되어있습니다. 각 라우터로 분기시켜주는 파일입니다.
*/

import React, { ReactElement, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { useTranslation } from 'react-i18next';
import theme from './styles/theme';

import Home from './pages/Home/Index';
import Register from './pages/Register/Index';
import Login from './pages/Login/Index';
import QuestionList from './pages/QuestionList/Index';
import QuestionWrite from './pages/QuestionWrite';
import QuestionUpdate from './pages/QuestionUpdate';
import QuestionDetail from './pages/QuestionDetail';
import AI from './pages/AI';
import MyPage from './pages/MyPage/Index';

import { logincheck } from './modules/member';

const App = (): ReactElement => {
  const dispatch = useDispatch();
  const localStoragetokenCheck = localStorage.getItem('token');
  const { i18n } = useTranslation();

  useEffect(() => {
    if (localStoragetokenCheck) {
      // 로그인유지를 위해서 isLogin을 true로 변경해줘야한다.
      dispatch(logincheck());
    }

    const userLanguage = localStorage.getItem('language') || window.navigator.language || 'en';
    i18n.changeLanguage(userLanguage); // 언어 설정
  }, []);

  return (
    <ThemeProvider theme={theme}>
      {/* ThemeProvider는 theme.ts에서 지정한 테마입니다. */}
      <Switch>
        {/* Switch 는 첫번째로 매칭되는 path 를 가진 컴포넌트를 렌더링 시킵니다. */}
        <Route exact path="/" component={Home} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route path="/check/ai" component={AI} />
        <Route path="/check/mate" component={QuestionList} />
        <Route path="/question/write" component={QuestionWrite} />
        <Route path="/question/update/:id" component={QuestionUpdate} />
        <Route path="/question/:id" component={QuestionDetail} />
        <Route path="/profile/:id" component={MyPage} />
      </Switch>
    </ThemeProvider>
  );
};

export default App;
