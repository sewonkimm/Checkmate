/*
QuestionDetail/index.tsx
: 질문 상세 조회 페이지
*/

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getQuestionDetail } from '../../api/question';
import { QuestionResponseType } from '../../entity';
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

  return <>{question === null || question === undefined ? <>loading...</> : <Question data={{ ...question }} />}</>;
};

export default QuestionDetail;
