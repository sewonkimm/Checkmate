/* eslint-disable react/destructuring-assignment */

/*
QuestionDetail/components/Question.tsx
: 질문 상세 조회 페이지의 질문 컴포넌트
*/

import React, { ReactElement, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { RootState } from '../../../modules';
import { QuestionResponseType } from '../../../entity';

// index.tsx에서 fetch 해온 정보 중 질문에 관한 정보를 props로 받아옴
type PropsType = {
  data: QuestionResponseType;
};

const Question = (props: PropsType): ReactElement => {
  const [memberId, setMemberId] = useState<number>(useSelector((state: RootState) => state.member.member.memberId));

  console.log(props.data);
  return (
    <QuestionContainer>
      <Infomation>
        <div>D-day</div>
        <div>작성일</div>
      </Infomation>

      <ProfileContainer>
        <div>프로필사진</div>
        <div>{props.data.memberId}</div>
      </ProfileContainer>

      <Title>{props.data.questionTitle}</Title>
      <Explain>{props.data.questionExplain}</Explain>

      {props.data.questionContents !== '' ? <Contents>{props.data.questionContents}</Contents> : <div>파일첨부</div>}

      {memberId === props.data.memberId && <div>수정 삭제 버튼</div>}
    </QuestionContainer>
  );
};

// 질문 컴포넌트 style
const QuestionContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
`;

const Infomation = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-itmes: center;
`;

const Title = styled.h1``;
const Explain = styled.p``;

const Contents = styled.div`
  background-color: ${({ theme }) => theme.colors.whiteF4};
`;
export default Question;
