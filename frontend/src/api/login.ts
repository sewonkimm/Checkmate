import axios from 'axios';

const apiBaseURL = process.env.REACT_APP_API_URL;

const axiosInstance = axios.create({
  baseURL: `${apiBaseURL}/`,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json; charset=utf-8',
  },
});

type loginData = {
  memberEmail: string;
  memberPassword: string;
};

type responseType = {
  accesstoken: string;
  message: string;
};

const LoginAPI = async (url: string, data: loginData): Promise<responseType> => {
  const response = await axiosInstance
    .post(url, data)
    .then((response) => {
      return response.data;
    })
    .catch(() => {
      return {
        accesstoken: null,
        message: 'error',
      };
    });
  return response;
};

export default LoginAPI;
