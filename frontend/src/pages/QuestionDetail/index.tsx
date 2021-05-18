/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
/*
QuestionDetail/index.tsx
: 질문 상세 조회 페이지
*/

import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import styled from 'styled-components';
import Loader from 'react-loader-spinner';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();
  const router = useHistory();
  const params: Params = useParams();

  const [myId] = useState<number>(useSelector((state: RootState) => state.member.member.memberId));
  const [limit] = useState<number>(3); // 답변을 몇 개 단위로 볼 것인지
  const [offset, setOffset] = useState<number>(0); // 페이지 넘버, 0부터 시작
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [isChecked, setIsChecked] = useState<boolean>(false); // 채택된 답변인지 구분
  const [isAnswerd, setIsAnswerd] = useState<boolean>(false); // 내가 답변을 작성한 게시글인지 구분
  const [question, setQuestion] = useState<QuestionType>();
  const [answers, setAnswers] = useState<ResponseAnswerType>({ totalSize: 0, list: [] });

  // 답변들 불러오기
  const fetchAnswers = async () => {
    if (hasMore) {
      const answers = await getAnswers(`answers/list/${params.id}/0/${limit}`);
      if (answers.totalSize === 0) {
        setHasMore(false);
      } else if (limit * offset < answers.totalSize) {
        setOffset(offset + 1);
        setHasMore(false);
      } else {
        setAnswers(answers);
      }
    }
  };

  useEffect(() => {
    // 질문 내용 불러오기
    const fetchQuestionDetail = async () => {
      const questionDetail = await getQuestionDetail(`questions/${params.id}`);
      if (questionDetail.questionStatus === 1) {
        setIsChecked(true);
      }
      setQuestion(questionDetail);
    };

    fetchQuestionDetail();
    fetchAnswers();
  }, []);

  useEffect(() => {
    fetchAnswers();
  });

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

  const handleBackButton = () => {
    router.goBack();
  };

  return (
    <QuestionDetailContainer>
      <SubHeader />
      <Header />
      {question === null || question === undefined ? (
        <LoaderWrapper>
          <Loader type="TailSpin" color="#038EFC" height={50} width={50} />
        </LoaderWrapper>
      ) : (
        <DetailContainer>
          <BackButton onClick={handleBackButton}>{t('back')}</BackButton>
          <Question question={{ ...question }} id={myId} />

          {myId !== question.memberId && !isAnswerd && (
            <WriteAnswer id={myId} questionContents={question.questionContents} setIsAnswerd={setIsAnswerd} />
          )}

          {/* 아직 답변이 안달린 상태 */}
          {myId !== question.memberId && isAnswerd && !isChecked && (
            <Message type={1} id={myId} message={t('detail_msg_waiting')} />
          )}

          {/* 답변이 달렸으나 채택을 하지 않은 상태 */}
          {myId === question.memberId && !isChecked && <Message type={3} id={myId} message={t('detail_msg_warning')} />}

          {/* 답변 채택된 상태 */}
          {isChecked && <Message type={2} id={myId} message={t('detail_msg_picked')} />}
          <Answers
            answer={answers}
            questionStatus={question.questionStatus}
            questionContents={question.questionContents}
            id={myId}
            offset={offset}
            hasMore={hasMore}
            fetchAnswer={fetchAnswers}
            setIsAnswerd={setIsAnswerd}
            setIsChecked={setIsChecked}
          />
        </DetailContainer>
      )}
    </QuestionDetailContainer>
  );
};

const QuestionDetailContainer = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.whiteF7};
`;
const DetailContainer = styled.div`
  max-width: 985px;
  width: 100%;
  margin: auto;
  padding: 80px 0 0 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const LoaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin: 50px auto;
`;

const BackButton = styled.button`
  max-width: 134px;
  hegith: 56px;
  text-decoration: none;
  padding: 10px 0;
  border-radius: 10px;
  font-size: ${({ theme }) => theme.fontSizes.body};
  color: ${({ theme }) => theme.colors.white};
  background-color: ${({ theme }) => theme.colors.primary};
  transition: all 0.3s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.accent};
    transform: scale(0.95);
  }
`;

export default QuestionDetail;
