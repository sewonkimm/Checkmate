/*
QuestionDetail/components/Answers.tsx
: 질문 상세 조회 페이지의 답변들을 담는 컴포넌트
*/

import React, { ReactElement } from 'react';
import styled from 'styled-components';
import { AnswerType, ResponseAnswerType } from '../../../entity';
import { noAnswer } from '../../../assets';
import Answer from './Answer';

type PropsType = {
  id: number;
  answer: ResponseAnswerType;
  questionContents: string;
  setIsAnswerd: (value: boolean) => void;
};

const Answers = (props: PropsType): ReactElement => {
  const { id, answer, questionContents } = props;
  let answerComponents;
  if (answer.list !== null) {
    answerComponents = answer.list.map((item: AnswerType) => {
      return (
        <Answer
          key={item.answerId}
          id={id}
          answer={item}
          questionContents={questionContents}
          setIsAnswerd={props.setIsAnswerd}
        />
      );
    });
  }

  return (
    <AnswerContainer>
      {answer.totalSize === 0 ? (
        <NoAnswer>
          <NoAnswerImage src={noAnswer} alt="no answer" />
          아직 달린 답변이 없어요...
        </NoAnswer>
      ) : (
        <>{answerComponents}</>
      )}
    </AnswerContainer>
  );
};

// 답변 컴포넌트 style
const AnswerContainer = styled.div`
  margin: 100px auto;
  padding-bottom: 100px;
`;

const NoAnswer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: 'Kirang Haerang', cursive;
  font-weight: normal;
  font-size: 72px;
`;
const NoAnswerImage = styled.img`
  width: 388px;
  height: 388px;
  margin-bottom: 10px;
`;
export default Answers;
