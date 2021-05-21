/*
  index.tsx
  : App.tsx안의 App 컴포넌트와 public/index.html을 연결해주는 역할을 하는 파일입니다.
*/

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension'; // 리덕스 개발자 도구
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import App from './App';
import { GlobalStyle } from './styles/global-styles';
import rootReducer from './modules';
import './lang/config';

// composeWithDevTools 를 사용하여 리덕스 개발자 도구 활성화
const store = createStore(rootReducer, composeWithDevTools());
const persistor = persistStore(store);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <GlobalStyle />
      <PersistGate loading={null} persistor={persistor} />
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
);
