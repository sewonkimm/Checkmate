/* 
작성한 모듈을 모아 root reducer를 생성합니다.
주의) RootState라는 type을 만들어서 내보내어야합니다. 나중에 useSelector를 사용할 때 필요로합니다.
*/

import { combineReducers } from 'redux';
import member from './member';

const rootReducer = combineReducers({
  member,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
