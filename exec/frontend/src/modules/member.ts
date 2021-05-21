/* 
회원정보 관련 데이터를 관리하는 모듈입니다.
Ducks 패턴으로 작성되어 한 파일에서 action type, action creator, reducer를 관리합니다.
*/

import { MemberType } from '../entity';

// action types
const LOGIN = 'member/LOGIN' as const; // action type 선언시 as const(const assertions 문법)라는 키워드를 붙어야 합니다
const LOGOUT = 'member/LOGOUT' as const;
const LOGINCHECK = 'member/LOGINCHECK' as const;

// action creators
export const login = (member: MemberType) => ({
  type: LOGIN,
  payload: member,
});
export const logout = () => ({
  type: LOGOUT,
});
export const logincheck = () => ({
  type: LOGINCHECK,
});

type MemberAction = ReturnType<typeof login> | ReturnType<typeof logout> | ReturnType<typeof logincheck>;

// state
type MemberState = {
  member: MemberType;
  isLogin: boolean;
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
  isLogin: false,
};

// reducers
function memberReducer(state = initialState, action: MemberAction): MemberState {
  switch (action.type) {
    case LOGIN:
      localStorage.setItem('memberId', action.payload.memberId.toString());
      localStorage.setItem('language', action.payload.memberNativeLang); // 모국어 설정
      return { member: action.payload, isLogin: true };
    case LOGOUT:
      localStorage.removeItem('language');
      localStorage.removeItem('token');
      return { member: initialState.member, isLogin: false };
    case LOGINCHECK:
      return { member: state.member, isLogin: true };
    default:
      return state;
  }
}

export default memberReducer;
