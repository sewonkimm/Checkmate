/* 
회원정보 관련 데이터를 관리하는 모듈입니다.
Ducks 패턴으로 작성되어 한 파일에서 action type, action creator, reducer를 관리합니다.
*/

import { MemberType } from '../entity';

// action types
const LOGIN = 'member/LOGIN' as const; // action type 선언시 as const(const assertions 문법)라는 키워드를 붙어야 합니다
const LOGOUT = 'member/LOGOUT' as const;

// action creators
export const login = (member: MemberType) => ({
  type: LOGIN,
  payload: member,
});
export const logout = () => ({
  type: LOGOUT,
});

type MemberAction = ReturnType<typeof login> | ReturnType<typeof logout>;

// state
type MemberState = {
  member: MemberType;
};

const initialState: MemberState = {
  member: {
    memberEmail: '',
    memberId: 0,
    memberIntroduce: '',
    memberNativeLang: 'en',
    memberNickname: '',
    memberPoint: 0,
    memberProfileUrl: '',
    memberTypeId: 0,
  },
};

// reducers
function memberReducer(state = initialState, action: MemberAction): MemberState {
  switch (action.type) {
    case LOGIN:
      localStorage.setItem('language', action.payload.memberNativeLang); // 모국어 설정
      return { member: action.payload };
    case LOGOUT:
      return { member: initialState.member };
    default:
      return state;
  }
}

export default memberReducer;
