import axios from 'axios';

const apiBaseURL = process.env.REACT_APP_API_URL;

const axiosInstance = axios.create({
  baseURL: `${apiBaseURL}/`,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json; charset=utf-8',
  },
});

const validateEmailAPI = async (url: string): Promise<number> => {
  const response = await axiosInstance
    .get(url)
    .then((response) => {
      // 0이면 중복없음, 1이면 중복
      return response.data;
    })
    .catch(() => {
      return -1;
    });
  return response;
};

// 이메일 중복확인
const validateNicknameAPI = async (url: string): Promise<number> => {
  const response = await axiosInstance
    .get(url)
    .then((response) => {
      // 0이면 중복없음, 1이면 중복
      return response.data;
    })
    .catch(() => {
      return -1;
    });
  return response;
};

// 회원가입 요청
type credentialsType = {
  memberEmail: string;
  memberId: number;
  memberIntroduce: string;
  memberNativeLang: string;
  memberNickname: string;
  memberPassword: string;
  memberPoint: number;
  memberProfileUrl: string;
  memberTypeId: number;
}
const registerAPI = async (credentials: credentialsType): Promise<number> => {
  const response = await axiosInstance
    .post('/members/signUp', credentials)
    .then((response) => {
      // status 반환 200이면 ok
      return response.status;
    })
    .catch(() => {
      return -1;
    });
  return response;
};

export default {validateEmailAPI, validateNicknameAPI, registerAPI};
