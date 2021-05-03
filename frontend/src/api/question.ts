import axios from 'axios';
import { QuestionType } from '../entity';

const apiBaseURL = process.env.REACT_APP_API_URL;

const axiosInstance = axios.create({
  baseURL: `${apiBaseURL}`,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json; charset=utf-8',
  },
});

const WriteAPI = async (data: QuestionType) => {
  const url = 'questions';
  const response = await axiosInstance
    .post(url, data)
    .then((response) => {
      const { status } = response;
      return status;
    })
    .catch((error) => {
      console.error(error);
    });

  return response;
};

export default WriteAPI;
