/*
QuestionDetail/index.tsx
: 질문 상세 조회 페이지
*/

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { getQuestionDetail } from '../../api/question';
import { QuestionResponseType } from '../../entity';
import SubHeader from '../../components/SubHeader';
import Header from '../../components/Header';
import Question from './components/Question';

type Params = {
  id: string;
};
const QuestionDetail: React.FC = () => {
  const params: Params = useParams();
  const [question, setQuestion] = useState<QuestionResponseType | null>();

  useEffect(() => {
    const fetchQuestionDetail = async () => {
      const questionDetail = await getQuestionDetail(`/questions/${params.id}`);
      setQuestion(questionDetail);
    };
    fetchQuestionDetail();
  }, [params]);

  return (
    <QuestionDetailContainer>
      <SubHeader />
      <Header />
      {question === null || question === undefined ? <>loading...</> : <Question data={{ ...question }} />}
    </QuestionDetailContainer>
  );
};

const QuestionDetailContainer = styled.div`
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.whiteF7};
`;

export default QuestionDetail;
