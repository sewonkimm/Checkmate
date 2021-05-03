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

export { WriteAPI, FileUploadAPI };
