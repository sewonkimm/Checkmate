/* eslint-disable react-hooks/exhaustive-deps */
/*
QuestionList/components/QuestionGroup.tsx
: 원어민 첨삭 질문 조회 페이지의 질문 컴포넌트들을 출력하는 곳
*/

import React, { ReactElement, useEffect, useState } from 'react';
import styled from 'styled-components';
import QuestionCard from './QuestionCard';
import { ResponseQuestionType } from '../../../entity';

type PropsType = {
  questions: ResponseQuestionType[];
  isFiltered: boolean;
  id: number;
};

const QuestionGroup = (props: PropsType): ReactElement => {
  const { isFiltered, id, questions } = props;
  const [myQuestions, setMyQuestions] = useState<ResponseQuestionType[]>([]);

  // 내 질문만 보기 버튼이 클릭 되었을 때 filtering
  useEffect(() => {
    if (isFiltered && id !== 0) {
      const myQuestions = questions.filter((item) => {
        return item.question.memberId === id;
      });
      setMyQuestions(myQuestions);
    }
  }, [isFiltered]);

  return (
    <QuestionsWrap>
      {isFiltered && id !== 0
        ? myQuestions.map((item: ResponseQuestionType) => (
            <QuestionCard id={id} key={item.question.questionId + Date.now()} question={item} />
          ))
        : questions.map((item: ResponseQuestionType) => (
            <QuestionCard id={id} key={item.question.questionId + Date.now()} question={item} />
          ))}
    </QuestionsWrap>
  );
};

const QuestionsWrap = styled.div`
  margin: auto;
  width: 80vw;
  max-width: 985px;
  height: auto;
`;

export default QuestionGroup;
