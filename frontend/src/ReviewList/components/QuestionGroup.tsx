import React, { useEffect, useState } from 'react';
import styled from 'styled-components'
import QuestionCard from './QuestionCard';
import QuestionAPI from '../../api/question';

// type responseType = Array<questionType>;
type questionType = {
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

// 전체 질문 조회
// list type = 
// 1- 등록날짜순(내림차순), 2- 마감날짜순(오름차순), 3-포인트순(내림차순)
// 요청 보내는 수 0부터 시작
// limit은 보내달라고 하는 갯수

const ReviewGroup: React.FC =  () => {
	const [questions, setQuestions] = useState<questionType[]>([]);
	const [listType, setListType] = useState<number>(1);
	const [offset, setOffset] = useState<number>(0);


	useEffect(() => {
		async function fetchQuestions() {
			const res = await QuestionAPI.getQuestions(`questions/${listType}/${offset}/3`)
				// eslint-disable-next-line no-console
				console.log(res)
				const questionGroup = res.map(item => item)
				setQuestions(questionGroup)
		}
		fetchQuestions()		
	}, [listType, offset])



	return(
		<QuestionsWrap>
			{
				questions.map( (item: questionType) => (
					<QuestionCard
						key={item.questionId}
						question={item}
					/>

				))
			}
		</QuestionsWrap>
	)
};

const QuestionsWrap = styled.div`
	margin: auto;
	width: 80vw;
	max-width: 1200px;
	height: auto;
	padding-bottom: 1rem;
`

export default ReviewGroup;