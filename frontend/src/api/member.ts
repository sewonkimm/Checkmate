import axios from 'axios';
import { MemberType } from '../entity';

// axois basic config
const apiBaseURL = process.env.REACT_APP_API_URL;
const axiosInstance = axios.create({
  baseURL: `${apiBaseURL}`,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json; charset=utf-8',
  },
});

// API
// 사용자 정보 조회
const getMemberInfo = async (url: string): Promise<MemberType | null> => {
  const response = await axiosInstance
    .get(url)
    .then((response) => {
      const memberInfo = response.data;
      return memberInfo;
    })
    .catch((err) => {
      console.error(err);
      return null;
    });
  return response;
};

export { getMemberInfo };
