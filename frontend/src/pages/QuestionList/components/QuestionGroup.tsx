import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import QuestionCard from './QuestionCard';
import { getQuestions } from '../../../api/question';
import { QuestionResponseType } from '../../../entity';

// 전체 질문 조회
// list type = 1- 등록날짜순(내림차순), 2- 마감날짜순(오름차순), 3-포인트순(내림차순)
// 요청 보내는 수 0부터 시작
// limit은 보내달라고 하는 갯수

const QuestionGroup: React.FC = () => {
  const [questions, setQuestions] = useState<QuestionResponseType[]>([]);
  const [listType, setListType] = useState<number>(1);
  const [offset, setOffset] = useState<number>(0);

  useEffect(() => {
    async function fetchQuestions() {
      const response = await getQuestions(`questions/${listType}/${offset}/3`);
      const questionGroup = response.map((item) => item); // shallow deep
      setQuestions(questionGroup);
    }
    fetchQuestions();
  }, [listType, offset]);

  return (
    <QuestionsWrap>
      {questions.map((item: QuestionResponseType) => (
        <QuestionCard key={item.questionId} question={item} />
      ))}
    </QuestionsWrap>
  );
};

const QuestionsWrap = styled.div`
  margin: auto;
  width: 80vw;
  max-width: 1200px;
  height: auto;
  padding-bottom: 1rem;
`;

export default QuestionGroup;
