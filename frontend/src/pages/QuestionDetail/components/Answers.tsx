/* eslint-disable react/destructuring-assignment */

/*
QuestionDetail/components/Answers.tsx
: 질문 상세 조회 페이지의 답변 컴포넌트
*/

import React, { ReactElement } from 'react';
import styled from 'styled-components';
import { AnswerResponseType } from '../../../entity';
import { noAnswer } from '../../../assets';

const Answers = (props: AnswerResponseType): ReactElement => {
  console.log(props);
  return (
    <AnswerContainer>
      {props.totalSize === 0 ? (
        <NoAnswer>
          <NoAnswerImage src={noAnswer} alt="no answer" />
          아직 달린 답변이 없어요...
        </NoAnswer>
      ) : (
        <>{props.totalSize}</>
      )}
    </AnswerContainer>
  );
};

// 질문 컴포넌트 style
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
