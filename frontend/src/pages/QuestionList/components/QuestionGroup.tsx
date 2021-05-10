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
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
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
  const [limit] = useState<number>(10);
  const [offset, setOffset] = useState<number>(0);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const { isFiltered, id } = props;

  const MySwal = withReactContent(Swal);

  // 내 질문만 보기 버튼이 클릭 되었을 때
  useEffect(() => {
    // 랜더링 되거나, 리스트타입, 오프셋이 바뀔 때, api요청을 보냄
    async function fetchQuestions() {
      const response = await getQuestions(`questions/${listType}/${offset}/${limit}`);
      if (response === []) {
        MySwal.fire({
          text: '질문을 받아오는데 실패했습니다.',
          icon: 'error',
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
    }
  };
  return (
    <InfiniteScroll dataLength={offset} next={fetchData} hasMore={hasMore} loader={<h3>Loading . . .</h3>}>
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

const QuestionsWrap = styled.div`
  margin: auto;
  width: 80vw;
  max-width: 985px;
  height: auto;
`;

export default QuestionGroup;
