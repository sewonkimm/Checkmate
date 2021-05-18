/* eslint-disable react/destructuring-assignment */
/*
QuestionDetail/components/Answers.tsx
: 질문 상세 조회 페이지의 답변들을 담는 컴포넌트
*/

import React, { ReactElement } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import Loader from 'react-loader-spinner';
import InfiniteScroll from 'react-infinite-scroll-component';
import { AnswerType, ResponseAnswerType } from '../../../entity';
import { noAnswer } from '../../../assets';
import Answer from './Answer';

type PropsType = {
  id: number;
  questionMemberId: number;
  answer: ResponseAnswerType;
  questionStatus: number;
  questionContents: string;
  offset: number;
  hasMore: boolean;
  fetchAnswer: () => void;
  setIsAnswerd: (value: boolean) => void;
  setIsChecked: (value: boolean) => void;
};

const Answers = (props: PropsType): ReactElement => {
  const { t } = useTranslation();
  const { id, questionMemberId, answer, questionStatus, questionContents, offset, hasMore } = props;

  let answerComponents;
  if (answer.list !== null) {
    answerComponents = answer.list.map((item: AnswerType) => {
      return (
        <Answer
          key={item.answerId}
          id={id}
          questionMemberId={questionMemberId}
          answer={item}
          questionStatus={questionStatus}
          questionContents={questionContents}
          setIsAnswerd={props.setIsAnswerd}
          setIsChecked={props.setIsChecked}
        />
      );
    });
  }

  return (
    <AnswerContainer>
      {answer.totalSize === 0 ? (
        <NoAnswer>
          <NoAnswerImage src={noAnswer} alt="no answer" />
          {t('detail_no_answer')}
        </NoAnswer>
      ) : (
        <InfiniteScroll
          dataLength={offset}
          next={props.fetchAnswer}
          hasMore={hasMore}
          loader={
            <LoaderWrapper>
              <Loader type="TailSpin" color="#038EFC" height={50} width={50} />
            </LoaderWrapper>
          }
        >
          <>{answerComponents}</>
        </InfiniteScroll>
      )}
    </AnswerContainer>
  );
};

// 답변 컴포넌트 style
const AnswerContainer = styled.div`
  width: 100%;
  margin: 50px auto;
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

const LoaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin: 50px auto;
`;
export default Answers;
