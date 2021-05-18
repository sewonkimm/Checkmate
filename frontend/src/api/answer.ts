import axios from 'axios';
import { AnswerType, ReviewType } from '../entity';

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
const getAnswers = async (url: string): Promise<AnswerType[]> => {
  const response = await axiosInstance
    .get(url)
    .then((response) => {
      return response.data.list;
    })
    .catch((err) => {
      console.error(err);
      return [];
    });
  return response;
};

// 답변 목록  총 갯수 조회
const getAnswersNumber = async (url: string): Promise<number> => {
  const response = await axiosInstance
    .get(url)
    .then((response) => {
      return response.data.totalSize;
    })
    .catch((err) => {
      console.error(err);
      return -1;
    });
  return response;
};

// 답변 작성
const WriteAPI = async (data: AnswerType): Promise<number> => {
  const url = 'answers';
  const response = await axiosInstance
    .post(url, data)
    .then((response) => {
      return response.status;
    })
    .catch((error) => {
      console.error(error);
      return 500;
    });

  return response;
};

// 답변 삭제
const DeleteAPI = async (url: string): Promise<number> => {
  const response = await axiosInstance
    .delete(url)
    .then((response) => {
      return response.status;
    })
    .catch((err) => {
      console.error(err);
      return err;
    });
  return response;
};

// 답변 채택
const chooseAnswerAPI = async (url: string, data: ReviewType): Promise<number> => {
  const response = await axiosInstance
    .put(url, data)
    .then((response) => {
      return response.status;
    })
    .catch((err) => {
      console.error(err);
      return err;
    });
  return response;
};

// 리뷰 작성
const WriteReviewAPI = async (data: ReviewType): Promise<number> => {
  const url = 'reviews';
  const response = await axiosInstance
    .post(url, data)
    .then((response) => {
      return response.status;
    })
    .catch((err) => {
      console.error(err);
      return err;
    });
  return response;
};

export { getAnswers, WriteAPI, DeleteAPI, chooseAnswerAPI, WriteReviewAPI, getAnswersNumber };
