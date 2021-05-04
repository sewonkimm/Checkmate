import axios from 'axios';
import { QuestionType, QuestionResponseType } from '../entity';

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
const getQuestions = async (url: string): Promise<QuestionResponseType[]> => {
  const response = await axiosInstance
    .get(url)
    .then((response) => {
      const resList = response.data.list;
      return resList;
    })
    .catch((err) => {
      console.error(err);
      return [];
    });
  return response;
};

const getRemainDate = (endDate: string): number => {
  const setDate = new Date(`${endDate}`);
  // 현재 날짜를 new 연산자를 사용해서 Date 객체를 생성
  const now = new Date();
  // D-Day 날짜에서 현재 날짜의 차이를 getTime 메서드를 사용해서 밀리초의 값으로 가져온다.
  const distance = setDate.getTime() - now.getTime();
  const day = Math.floor(distance / (1000 * 60 * 60 * 24));
  return day;
};

const WriteAPI = async (data: QuestionType): Promise<number> => {
  const url = 'questions';
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

const FileUploadAPI = async (file: File): Promise<string | number> => {
  const fileData = new FormData();
  fileData.append('questionFile', file);

  const url = 'questions/fileUpload';
  const response = await axiosInstance
    .post(url, fileData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((response) => {
      return response.data.fileUrl;
    })
    .catch((error) => {
      console.error(error);
      return 500;
    });
  return response;
};

export { WriteAPI, FileUploadAPI, getQuestions, getRemainDate };
