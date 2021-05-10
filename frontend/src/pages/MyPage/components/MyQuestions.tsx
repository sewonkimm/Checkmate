import React, { ReactElement, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { MyQuestionAPI } from '../../../api/question';
import { RootState } from '../../../modules';
import { ResponseMyQuestionListType } from '../../../entity/index';

const MyQuestions = (): ReactElement => {
  const userId: number = useSelector((state: RootState) => state.member).member.memberId;
  const [offset, setOffset] = useState<number>(0);
  const [limit, setLimit] = useState<number>(3);
  const [totalAsk, setTotalAsk] = useState<number>(0);
  const [totalReply, setTotalReply] = useState<number>(0);
  const [questionList, setQuestionList] = useState<ResponseMyQuestionListType[]>([]);

  useEffect(() => {
    const fetchMyQuestion = async () => {
      const response = await MyQuestionAPI(`questions/member/${userId}/${offset}/${limit}`);
      if (response !== null) {
        const totalAsk = response.answerTotal;
        const totalReply = response.totalSize;
        const questionLists = questionList.concat(response.list);
        setTotalAsk(totalAsk);
        setTotalReply(totalReply);
        setQuestionList(questionLists);
      } else {
        alert('내가 쓴 글 요청 실패!');
      }
    };
    fetchMyQuestion();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [offset]);

  const dateSplit = (date: undefined | null | string) => {
    if (date !== undefined && date !== null) {
      return date.split('T')[0].replaceAll('-', '.');
    }
    return '';
  };
  const handleGetMoreBtn = async () => {
    // api부르고 받아온 배열에 추가해서 setState
    if (totalAsk > offset * 3 + 1) {
      setOffset(offset + 1);
    }
  };

  return (
    <Questions>
      <HeaderTitle>My Questions</HeaderTitle>
      <HeaderCounts>
        <div>
          질문: {totalAsk}개 | 답변: {totalReply}개
        </div>
      </HeaderCounts>
      <ListHeader>
        <Title>제목</Title>
        <AnswerCnt>답변 수</AnswerCnt>
        <Created>작성일</Created>
      </ListHeader>

      {questionList.length > 0 ? (
        questionList.map((item) => {
          return (
            <QuestionLists>
              <MyTitle>
                <PointSpan>{item.question.questionPoint}</PointSpan>
                {item.question.questionTitle}
              </MyTitle>
              <AnswerCnt>{item.answerCount}</AnswerCnt>
              <Created>{dateSplit(item.question.questionDate)}</Created>
            </QuestionLists>
          );
        })
      ) : (
        <NoQuestionMsg>아직 글을 쓰신적이 없습니다 😥</NoQuestionMsg>
      )}

      <ExtensionBtn onClick={handleGetMoreBtn}>내가 쓴 글 더보기</ExtensionBtn>
    </Questions>
  );
};

const Questions = styled.div`
  width: 100%;
  padding: 30px;
  margin-top: 2em;
  box-shadow: 0px 0px 40px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
`;
const HeaderTitle = styled.h2`
  font-weight: 700;
  font-size: 36px;
  margin: 0;
`;
const HeaderCounts = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  font-weight: 700;
  font-size: 18px;
`;
const ListHeader = styled.div`
  margin-top: 1em;
  padding: 10px;
  display: flex;
  font-weight: 700;
  font-size: 18px;
`;
const Title = styled.div`
  flex-basis: 55%;
  text-align: center;
`;
const PointSpan = styled.span`
  background: #038efc;
  border-radius: 20px;
  color: ${({ theme }) => theme.colors.white};
  padding: 0.5px 12px;
  font-weight: 500;
  font-size: 18px;
  line-height: 19px;
  margin-right: 10px;
`;

const MyTitle = styled.div`
  flex-basis: 55%;
  text-align: center;
  text-align: start;
`;
const NoQuestionMsg = styled.h4`
  text-align: center;
`;

const AnswerCnt = styled.div`
  flex-basis: 35%;
  text-align: center;
`;
const Created = styled.div`
  flex-basis: 10%;
  text-align: center;
`;
const QuestionLists = styled.div`
  display: flex;
  padding: 0.4em;
  font-size: 18px;
`;

const ExtensionBtn = styled.button`
  width: 100%;
  margin: 30px 0 0 0;
  background: #038efc;
  border-radius: 5px;
  padding: 11px 15px;
  color: ${({ theme }) => theme.colors.white};
  font-size: 18px;
  font-weight: 700;
  &: hover {
    cursor: pointer;
  } ;
`;

export default MyQuestions;
