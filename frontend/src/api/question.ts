import axios from 'axios';

const apiBaseUrl = process.env.REACT_APP_API_URL;

const axiosInstance = axios.create({
	baseURL: `${apiBaseUrl}`,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json; charset=utf-8',
  },
});
type responseType = Array<QuestionsType>;
type QuestionsType = {
	memberId: number,
	questionContents:string,
	questionDate: string,
	questionEndDate: string,
	questionExplain: string,
	questionId: number,
	questionPoint: number,
	questionStatus: number,
	questionTitle: string,
	questionUrl: string,
};

const getQuestions = async (url: string) :Promise<responseType> => {
	const response = await axiosInstance
	.get(url)
	.then((response) => {
		const resList = response.data.list
		return resList
	}) 
	.catch((err) => {
		return err
	})
	return response
}

const getRemainDate = (endDate: string) :number => {
	const setDate = new Date(`${endDate}`);
	// 현재 날짜를 new 연산자를 사용해서 Date 객체를 생성
	const now = new Date();
	// D-Day 날짜에서 현재 날짜의 차이를 getTime 메서드를 사용해서 밀리초의 값으로 가져온다. 
	const distance = setDate.getTime() - now.getTime();
	const day = Math.floor(distance/(1000*60*60*24));
	return day
}

export default {getQuestions, getRemainDate}