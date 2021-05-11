import axios from 'axios';
import { MemberType, ResponseMyReview } from '../entity';

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

// 사용자가 받은 review 조회
const getMemberReview = async (url: string): Promise<ResponseMyReview | null> => {
  const response = await axiosInstance
    .get(url)
    .then((response) => {
      const responseReview = {
        totalSize: response.data.totalSize,
        reviewList: response.data.reviewList,
      };
      return responseReview;
    })
    .catch((err) => {
      console.log(err);
      return null;
    });
  return response;
};

// 사용자가 받은 총 review 평균 점수
const getAvgReview = async (url: string): Promise<number | null> => {
  const response = await axiosInstance
    .get(url)
    .then((response) => {
      const reviewScore = response.data.memberGrade;
      return reviewScore;
    })
    .catch((err) => {
      console.error(err);
      return null;
    });
  return response;
};

export { getMemberInfo, getMemberReview, getAvgReview };
