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

export default validateEmailAPI;
