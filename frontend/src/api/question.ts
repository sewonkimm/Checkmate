import axios from 'axios';

const apiBaseUrl = process.env.REACT_APP_API_URL;

const axiosInstance = axios.create({
	baseURL: `${apiBaseUrl}`,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json; charset=utf-8',
  },
});


const getQuestions = async (url: string) => {
	const response = await axiosInstance
	.get(url)
	.then((response) => {
		const resList = response.data.list.map((item: any) => item)
		console.log(resList)
		return resList
	}) 
	.catch((err) => {
		return err
	})
	return response
}

export default {getQuestions}