/* eslint-disable array-callback-return */
/*
QuestionDetail/index.tsx
: 질문 상세 조회 페이지
*/

import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { RootState } from '../../modules';
import { getQuestionDetail } from '../../api/question';
import { getAnswers } from '../../api/answer';
import { AnswerResponseType, AnswerType, QuestionResponseType } from '../../entity';
import SubHeader from '../../components/SubHeader';
import Header from '../../components/Header';
import Question from './components/Question';
import Answers from './components/Answers';
import WriteAnswer from './components/WriteAnswer';

type Params = {
  id: string;
};
const QuestionDetail: React.FC = () => {
  const [myId] = useState<number>(useSelector((state: RootState) => state.member.member.memberId));
  const params: Params = useParams();

  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [question, setQuestion] = useState<QuestionResponseType | null>();
  const [answers, setAnswers] = useState<AnswerResponseType>({ totalSize: 0, list: [] });

  const limit = 3; // 답변을 몇 개 단위로 볼 것인지

  useEffect(() => {
    // 질문 내용 불러오기
    const fetchQuestionDetail = async () => {
      const questionDetail = await getQuestionDetail(`questions/${params.id}`);
      setQuestion(questionDetail);
    };

    // 답변들 불러오기
    const fetchAnswers = async () => {
      const answers = await getAnswers(`answers/list/${params.id}/0/${limit}`);
      setAnswers(answers);
    };

    fetchQuestionDetail();
    fetchAnswers();
  }, [params]);

  // 이미 답변을 작성했으면 isChecked를 true로 변경하여 또 작성하지 못하도록 함
  useEffect(() => {
    if (answers.list !== null) {
      answers.list.map((answer: AnswerType) => {
        if (answer.memberId === myId) {
          setIsChecked(true);
        }
      });
    }
  }, [answers, myId]);

  return (
    <QuestionDetailContainer>
      <SubHeader />
      <Header />
      {question === null || question === undefined ? (
        <>loading...</>
      ) : (
        <>
          <Question data={{ ...question }} />

          {myId !== question.memberId && !isChecked && <WriteAnswer id={myId} />}
          <Answers totalSize={answers.totalSize} list={answers.list} />
        </>
      )}
    </QuestionDetailContainer>
  );
};

const QuestionDetailContainer = styled.div`
  height: 100%;
  background-color: ${({ theme }) => theme.colors.whiteF7};
`;

export default QuestionDetail;
