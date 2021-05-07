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
import { ResponseAnswerType, AnswerType, QuestionType } from '../../entity';
import SubHeader from '../../components/SubHeader';
import Header from '../../components/Header';
import Question from './components/Question';
import Answers from './components/Answers';
import WriteAnswer from './components/WriteAnswer';
import Message from './components/Message';

type Params = {
  id: string;
};
const QuestionDetail: React.FC = () => {
  const [myId] = useState<number>(useSelector((state: RootState) => state.member.member.memberId));
  const params: Params = useParams();

  const [isChecked, setIsChecked] = useState<boolean>(false); // 채택된 답변인지 구분
  const [isAnswerd, setIsAnswerd] = useState<boolean>(false); // 내가 답변을 작성한 게시글인지 구분
  const [question, setQuestion] = useState<QuestionType>();
  const [answers, setAnswers] = useState<ResponseAnswerType>({ totalSize: 0, list: [] });

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
  }, [params, isAnswerd]);

  // 이미 답변을 작성했으면 isChecked를 true로 변경하여 또 작성하지 못하도록 함
  useEffect(() => {
    if (answers.list !== null) {
      answers.list.map((answer: AnswerType) => {
        if (answer.memberId === myId) {
          setIsAnswerd(true);
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
          <Question question={{ ...question }} id={myId} />

          {myId !== question.memberId && !isAnswerd && <WriteAnswer id={myId} setIsAnswerd={setIsAnswerd} />}
          {myId !== question.memberId && isAnswerd && !isChecked && (
            <Message type={1} id={myId} message="질문자의 채택을 기다리고 있습니다." />
          )}
          {myId === question.memberId && isChecked && (
            <Message type={3} id={myId} message="님, 마감 기한 내에 답변을 채택해주세요!" />
          )}
          <Answers answer={answers} id={myId} setIsAnswerd={setIsAnswerd} />
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
