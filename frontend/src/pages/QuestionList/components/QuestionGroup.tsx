import React, { ReactElement, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroll-component';
import QuestionCard from './QuestionCard';
import { getQuestions, getTotalSize } from '../../../api/question';
import { QuestionResponseType } from '../../../entity';
import { RootState } from '../../../modules';

type PropsType = {
  myQuestionStatus: boolean;
};

// 전체 질문 조회
// list type = 1- 등록날짜순(내림차순), 2- 마감날짜순(오름차순), 3-포인트순(내림차순)
// 요청 보내는 수 0부터 시작
// limit은 보내달라고 하는 갯수

const QuestionGroup = (props: PropsType): ReactElement => {
  const [questions, setQuestions] = useState<QuestionResponseType[]>([]);
  const [myQuestions, setMyQuestions] = useState<QuestionResponseType[]>([]);
  const [listType, setListType] = useState<number>(1);
  const [offset, setOffset] = useState<number>(0);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const { myQuestionStatus } = props;
  // selector로 로그인된 memberId 가져오기
  const loginUserId: number = useSelector((state: RootState) => state.member).member.memberId;
  // 내 질문만 보기 버튼이 클릭 되었을 때
  useEffect(() => {
    // 랜더링 되거나, 리스트타입, 오프셋이 바뀔 때, api요청을 보냄
    async function fetchQuestions() {
      const response = await getQuestions(`questions/${listType}/${offset}/5`);
      if (response === []) {
        window.alert('전체 질문 리스트 요청 실패 !');
      } else if (myQuestionStatus === false) {
        const questionGroup = [...questions, ...response];
        setQuestions(questionGroup);
      }
    }
    // filtering
    if (myQuestionStatus && loginUserId !== 0) {
      const myQuestions = questions.filter((item) => {
        return item.question.memberId === loginUserId;
      });
      setMyQuestions(myQuestions);
    } else {
      fetchQuestions();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [myQuestionStatus, listType, offset]);

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
        {myQuestionStatus && loginUserId !== 0
          ? myQuestions.map((item: QuestionResponseType) => (
              <QuestionCard key={item.question.questionId + Date.now()} question={item} />
            ))
          : questions.map((item: QuestionResponseType) => (
              <QuestionCard key={item.question.questionId + Date.now()} question={item} />
            ))}
      </QuestionsWrap>
    </InfiniteScroll>
  );
};

const QuestionsWrap = styled.div`
  margin: auto;
  width: 80vw;
  max-width: 1200px;
  height: auto;
`;

export default QuestionGroup;
