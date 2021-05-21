/* 
작성한 모듈을 모아 root reducer를 생성합니다.
주의) RootState라는 type을 만들어서 내보내어야합니다. 나중에 useSelector를 사용할 때 필요로합니다.
*/

import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import member from './member';

const persistConfig = {
  key: 'root',
  // localStorage에 저장합니다.
  // session Storage에 저장하고 싶으면 import storageSession from 'redux-persist/lib/storage/session
  storage,
  // reducer 중에 member reducer만 localstorage에 저장합니다.
  whitelist: ['member'],
};

const rootReducer = combineReducers({
  member,
});

export default persistReducer(persistConfig, rootReducer);
export type RootState = ReturnType<typeof rootReducer>;
