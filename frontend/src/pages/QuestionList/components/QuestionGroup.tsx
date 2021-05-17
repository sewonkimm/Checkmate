/* eslint-disable react-hooks/exhaustive-deps */
/*
QuestionList/components/QuestionGroup.tsx
: 원어민 첨삭 질문 조회 페이지의 질문 컴포넌트들을 출력하는 곳

무한 스크롤을 적용했고, api 요청시 사용되는 변수의 의미는 다음과 같습니다

 - list type = 1- 등록날짜순(내림차순), 2- 마감날짜순(오름차순), 3-포인트순(내림차순)
 - offset: 페이지 넘버, 0부터 시작
 - limit: 한번에 몇개의 질문을 보여줄 것인지
*/

import React, { ReactElement, useEffect, useState } from 'react';
import styled from 'styled-components';
import InfiniteScroll from 'react-infinite-scroll-component';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import QuestionCard from './QuestionCard';
import { getQuestions, getTotalSize } from '../../../api/question';
import { ResponseQuestionType } from '../../../entity';

type PropsType = {
  isFiltered: boolean;
  id: number;
};

const QuestionGroup = (props: PropsType): ReactElement => {
  const [questions, setQuestions] = useState<ResponseQuestionType[]>([]);
  const [myQuestions, setMyQuestions] = useState<ResponseQuestionType[]>([]);
  const [listType] = useState<number>(1);
  const [limit] = useState<number>(5);
  const [offset, setOffset] = useState<number>(0);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const { isFiltered, id } = props;

  // 내 질문만 보기 버튼이 클릭 되었을 때
  useEffect(() => {
    // 랜더링 되거나, 리스트타입, 오프셋이 바뀔 때, api요청을 보냄
    async function fetchQuestions() {
      const response = await getQuestions(`questions/${listType}/${offset}/${limit}`);
      if (response === []) {
        toast.error('🐳 질문 요청 응답 실패!', {
          position: 'bottom-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else if (isFiltered === false) {
        const questionGroup = [...questions, ...response];
        setQuestions(questionGroup);
      }
    }
    // filtering
    if (isFiltered && id !== 0) {
      const myQuestions = questions.filter((item) => {
        return item.question.memberId === id;
      });
      setMyQuestions(myQuestions);
    } else {
      fetchQuestions();
    }
  }, [isFiltered, listType, offset]);

  const fetchData = async () => {
    const totalNum = await getTotalSize(`questions/${listType}/${offset}/5`);
    if (offset < totalNum / 5) {
      const offsets = offset + 1;
      setOffset(offsets);
    } else {
      setHasMore(false);
      toast.info('🐬 질문들을 모두 불러왔습니다', {
        position: 'bottom-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };
  return (
    <InfiniteScroll
      dataLength={offset}
      next={fetchData}
      hasMore={hasMore}
      // 로딩시 스피너
      loader={<Loader type="Puff" color="#00BFFF" height={100} width={100} timeout={3000} />}
    >
      <StyledContainer
        position="bottom-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <QuestionsWrap>
        {isFiltered && id !== 0
          ? myQuestions.map((item: ResponseQuestionType) => (
              <QuestionCard key={item.question.questionId + Date.now()} question={item} />
            ))
          : questions.map((item: ResponseQuestionType) => (
              <QuestionCard key={item.question.questionId + Date.now()} question={item} />
            ))}
      </QuestionsWrap>
    </InfiniteScroll>
  );
};

const StyledContainer = styled(ToastContainer)`
  width: 25vw;
  font-size: 20px;
`;

const QuestionsWrap = styled.div`
  margin: auto;
  width: 80vw;
  max-width: 985px;
  height: auto;
`;

export default QuestionGroup;
