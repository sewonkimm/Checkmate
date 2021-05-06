/* eslint-disable react/destructuring-assignment */

/*
QuestionDetail/components/Answer.tsx
: 질문 상세 조회 페이지의 답변 컴포넌트
*/

import React, { ReactElement, useState, useEffect } from 'react';
import styled from 'styled-components';
import { AnswerType, MemberType } from '../../../entity';
import { profileImage } from '../../../assets';
import { getMemberInfo } from '../../../api/member';

type PropsType = {
  data: AnswerType;
};

const Answer = (props: PropsType): ReactElement => {
  const [memberInfo, setMemberInfo] = useState<MemberType>();

  // 작성일 문자열 다듬기
  const createdDate = props.data.answerDate.split('T')[0].replaceAll('-', '.');

  // 작성자 정보
  useEffect(() => {
    const fetchMemberInfo = async () => {
      const data = await getMemberInfo(`/members/${props.data.memberId}`);
      if (data !== null) {
        setMemberInfo(data);
      }
    };
    fetchMemberInfo();
  }, [props]);

  return (
    <AnswerContainer key={props.data.answerId}>
      <WriteDate>작성일 {createdDate}</WriteDate>

      <ProfileContainer>
        {memberInfo?.memberProfileUrl === '' ? (
          <ProfileImage src={profileImage} alt="profile" />
        ) : (
          <ProfileImage src={memberInfo?.memberProfileUrl} alt="profile" />
        )}

        <Nickname>{memberInfo?.memberNickname}</Nickname>
      </ProfileContainer>

      {props.data.answerExplain !== '' && <Explain>{props.data.answerExplain}</Explain>}

      <>{props.data.answerContents}</>

      {props.data.answerUrl !== '' && (
        <FileButton href={props.data.answerUrl} target="_blank" download>
          첨부파일보기
        </FileButton>
      )}
    </AnswerContainer>
  );
};

// 답변 컴포넌트 style
const AnswerContainer = styled.div`
  max-width: 985px;
  margin: 50px auto 0;
  padding: 30px;
  display: flex;
  flex-direction: column;
  gap: 22px 0;
  position: relative;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 15px;
  box-shadow: 0px 5px 20px 2px rgba(48, 70, 89, 0.15);
`;

const WriteDate = styled.div`
  position: absolute;
  top: 30px;
  right: 30px;
`;

const ProfileContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-itmes: center;
`;
const ProfileImage = styled.img`
  width: 44px;
  height: 44px;
  margin: auto 10px auto 0;
`;
const Nickname = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.body};
  font-weight: bold;
`;

const Explain = styled.p`
  margin: 0 0 50px 0;
  font-size: 16px;
  font-weight: normal;
  line-height: 24px;
`;

const FileButton = styled.a`
  width: 270px;
  height: 53px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.white};
  border: 2px solid ${({ theme }) => theme.colors.primary};
  border-radius: 20px;
  font-size: ${({ theme }) => theme.fontSizes.body};
  font-weight: normal;
  color: ${({ theme }) => theme.colors.primary};
  cursor: pointer;
  text-decoration: none;
`;

export default Answer;
