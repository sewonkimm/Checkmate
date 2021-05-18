import axios from 'axios';
import { RequestQuestionType, ResponseQuestionType, QuestionType, ResponseUserQuestionType } from '../entity';

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
const getQuestions = async (url: string): Promise<ResponseQuestionType[]> => {
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

// 질문 상세조회
const getQuestionDetail = async (url: string): Promise<QuestionType> => {
  const response = await axiosInstance
    .get(url)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.error(err);
      return {};
    });
  return response;
};

const getTotalSize = async (url: string): Promise<number> => {
  const response = await axiosInstance
    .get(url)
    .then((response) => {
      const resSize = response.data.totalSize;
      return resSize;
    })
    .catch((err) => {
      console.error(err);
      return -1;
    });
  return response;
};

// 질문 작성
const WriteAPI = async (data: RequestQuestionType): Promise<number> => {
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

// 첨부파일 업로드
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

// 질문 수정
type UpdateQuestionType = {
  questionExplain: string;
  questionId: number;
};

const UpdateAPI = async (data: UpdateQuestionType): Promise<number> => {
  const url = 'questions';
  const response = await axiosInstance
    .put(url, data)
    .then((response) => {
      return response.status;
    })
    .catch((error) => {
      console.error(error);
      return 500;
    });

  return response;
};

// 유저가 작성한 질문 목록
const MyQuestionAPI = async (url: string): Promise<ResponseUserQuestionType | null> => {
  const response = await axiosInstance
    .get(url)
    .then((response) => {
      const res: ResponseUserQuestionType = {
        answerTotal: response.data.answerTotal,
        list: response.data.list,
        totalSize: response.data.totalSize,
      };
      return res;
    })
    .catch((err) => {
      console.log(err);
      return null;
    });
  return response;
};

export { WriteAPI, UpdateAPI, FileUploadAPI, getQuestions, getTotalSize, getQuestionDetail, MyQuestionAPI };
