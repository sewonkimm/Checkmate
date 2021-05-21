/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
/*
QuestionDetail/index.tsx
: 질문 상세 조회 페이지
*/

import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import styled from 'styled-components';
import Loader from 'react-loader-spinner';
import InfiniteScroll from 'react-infinite-scroll-component';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTranslation } from 'react-i18next';
import { getQuestionDetail } from '../../api/question';
import { getAnswers, getAnswersNumber } from '../../api/answer';
import { QuestionType, AnswerType } from '../../entity';
import SubHeader from '../../components/SubHeader';
import Header from '../../components/Header';
import Question from './components/Question';
import Answer from './components/Answer';
import WriteAnswer from './components/WriteAnswer';
import Message from './components/Message';
import { noAnswer } from '../../assets';

type Params = {
  id: string;
};
const QuestionDetail: React.FC = () => {
  const { t } = useTranslation();
  const router = useHistory();
  const params: Params = useParams();

  const myId = Number(localStorage.getItem('memberId'));
  const [limit] = useState<number>(3); // 답변을 몇 개 단위로 볼 것인지
  const [offset, setOffset] = useState<number>(0); // 페이지 넘버, 0부터 시작
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [isChecked, setIsChecked] = useState<boolean>(false); // 채택된 답변인지 구분
  const [isAnswered, setIsAnswered] = useState<boolean>(false); // 내가 답변을 작성한 게시글인지 구분
  const [question, setQuestion] = useState<QuestionType>();
  const [answers, setAnswers] = useState<AnswerType[]>([]); // 답변 배열
  const [totalNum, setTotalNum] = useState<number>(0); // 답변 길이

  // 답변 총 갯수 불러오기
  const fetchNumberAnswers = async () => {
    const response = await getAnswersNumber(`answers/list/${params.id}/${offset}/${limit}`);
    setTotalNum(response);

    if (response === 0) {
      setHasMore(false);
    }
  };

  // 답변 목록 불러오기
  const fetchAnswers = async () => {
    const response = await getAnswers(`answers/list/${params.id}/${offset}/${limit}`);
    setAnswers(response);

    if (response !== []) {
      checkIsAnswered(response);
    }
  };

  // 이미 답변을 작성했으면 isAnswerd를 true로 변경하여 또 작성하지 못하도록 함
  const checkIsAnswered = (answers: AnswerType[]) => {
    answers.map((answer: AnswerType) => {
      if (answer.memberId === myId) {
        setIsAnswered(true);
      }
    });
  };

  // 질문 내용 불러오기
  const fetchQuestionDetail = async () => {
    const questionDetail = await getQuestionDetail(`questions/${params.id}`);

    // 이미 채택된 질문이면 isChecked를 true로 변경하여 답변을 작성하지 못하도록 함
    if (questionDetail.questionStatus === 1) {
      setIsChecked(true);
    }
    setQuestion(questionDetail);
  };

  // 답변 더 불러오기
  const getMoreAnswers = async () => {
    const response = await getAnswers(`answers/list/${params.id}/${offset}/${limit}`);
    const newAnswers = [...answers, ...response];
    setAnswers(newAnswers);
  };

  useEffect(() => {
    fetchQuestionDetail();
    fetchNumberAnswers();
    fetchAnswers();
  }, []);

  // offset 변경 감지
  useEffect(() => {
    getMoreAnswers();
  }, [offset]);

  // answers 배열이 업데이트 될 때마다 화면에 새로 그려주기
  const answerComponents = answers.map((item: AnswerType) => {
    if (question !== undefined) {
      return <Answer key={item.answerId} id={myId} question={question} answer={item} />;
    }
    return <></>;
  });

  const handleBackButton = () => {
    router.goBack();
  };

  // infinite handle loader func
  const handleLoader = () => {
    if (limit * offset <= totalNum) {
      setOffset(offset + 1);
    } else {
      setHasMore(false); // 더이상 불러올 데이터가 없을 때
      toast.success(t('detail_msg_finish'), {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
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

          {/* 질문 작성자가 아니고, 아직 채택되지 않았고, 답변을 작성하지 않았다면 질문 작성 컴포넌트 표시 */}
          {myId !== question.memberId && !isAnswered && !isChecked && (
            <WriteAnswer id={myId} questionContents={question.questionContents} />
          )}

          {/* 질문 작성자가 아니고, 답변 달았으나 채택이 안된 상태 */}
          {myId !== question.memberId && isAnswered && !isChecked && (
            <Message type={1} id={myId} message={t('detail_msg_waiting')} />
          )}

          {/* 질문 작성자, 답변이 달렸으나 채택을 하지 않은 상태 */}
          {myId === question.memberId && !isChecked && totalNum > 0 && (
            <Message type={3} id={myId} message={t('detail_msg_warning')} />
          )}

          {/* 답변 채택된 상태 */}
          {isChecked && <Message type={2} id={myId} message={t('detail_msg_picked')} />}

          {totalNum > 0 ? (
            <InfiniteScroll
              dataLength={offset}
              next={handleLoader}
              hasMore={hasMore}
              loader={<Loader type="TailSpin" color="#038EFC" height={50} width={50} />}
            >
              {answerComponents}
            </InfiniteScroll>
          ) : (
            <NoAnswer>
              <NoAnswerImage src={noAnswer} alt="no answer" />
              {t('detail_no_answer')}
            </NoAnswer>
          )}
        </DetailContainer>
      )}

      <StyledToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
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
  padding: 80px 0 80px 0;
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

const NoAnswer = styled.div`
  width: 100%;
  margin: 100px auto 0;
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

const StyledToastContainer = styled(ToastContainer)`
  font-size: 19px;
  width: 17em;
`;
export default QuestionDetail;
