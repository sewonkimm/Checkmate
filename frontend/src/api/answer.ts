import axios from 'axios';
import { AnswerResponseType } from '../entity';

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
// 답변 목록 조회
const getAnswers = async (url: string): Promise<AnswerResponseType> => {
  const response = await axiosInstance
    .get(url)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.error(err);
      return { totalSize: 0, list: null };
    });
  return response;
};

// 답변 삭제
const DeleteAPI = async (url: string): Promise<number> => {
  const response = await axiosInstance
    .delete(url)
    .then((response) => {
      return 200;
    })
    .catch((err) => {
      console.error(err);
      return err;
    });
  return response;
};

export { getAnswers, DeleteAPI };
