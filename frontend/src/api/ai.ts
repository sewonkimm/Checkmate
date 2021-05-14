import axios from 'axios';
import { ResponseAIType, ResponseAIFixType } from '../entity';

// axois basic config
const apiBaseURL = process.env.REACT_APP_AI_API_URL;
const axiosInstance = axios.create({
  baseURL: `${apiBaseURL}`,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json; charset=utf-8',
  },
});

// API
// 분석
const checkSpell = async (data: { sentence: string }): Promise<ResponseAIType> => {
  const url = 'checkSpell';
  const response = await axiosInstance
    .post(url, data)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.error(err);
      return null;
    });
  return response;
};

// 추천교정
const recommendWords = async (data: { sentence: string }): Promise<ResponseAIFixType> => {
  const url = 'recommendWords';
  const response = await axiosInstance
    .post(url, data)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.error(err);
      return null;
    });
  return response;
};

export { checkSpell, recommendWords };
