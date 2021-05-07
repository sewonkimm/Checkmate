/* eslint-disable react/destructuring-assignment */

/*
QuestionDetail/components/Question.tsx
: 질문 상세 조회 페이지의 질문 컴포넌트
*/

import React, { ReactElement, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { RootState } from '../../../modules';
import { QuestionType, MemberType } from '../../../entity';
import { getMemberInfo } from '../../../api/member';
import { profileImage } from '../../../assets';
import BadgeComponent from '../../../components/Badge';
import UpdateButton from './UpdateButton';

type PropsType = {
  data: QuestionType;
};

const Question = (props: PropsType): ReactElement => {
  const [myId] = useState<number>(useSelector((state: RootState) => state.member.member.memberId));
  const [memberInfo, setMemberInfo] = useState<MemberType>();

  useEffect(() => {
    const fetchMemberInfo = async () => {
      const data = await getMemberInfo(`members/${props.data.memberId}`);
      if (data !== null) {
        setMemberInfo(data);
      }
    };
    fetchMemberInfo();
  }, [props]);

  // 작성일 문자열 다듬기
  const createdDate = props.data.questionDate.split('T')[0].replaceAll('-', '.');

  // 첨삭내용 문자 수
  const contentLength = props.data.questionContents.length;

  return (
    <QuestionContainer>
      <Infomation>
        <BadgeContainer>
          {props.data.questionPoint > 0 && <BadgeComponent content={props.data.questionPoint} date="" />}
          <BadgeComponent content="" date={props.data.questionEndDate} />
        </BadgeContainer>
        <div>작성일 {createdDate}</div>
      </Infomation>

      <ProfileContainer>
        {memberInfo?.memberProfileUrl === '' ? (
          <ProfileImage src={profileImage} alt="profile" />
        ) : (
          <ProfileImage src={memberInfo?.memberProfileUrl} alt="profile" />
        )}

        <Nickname>{memberInfo?.memberNickname}</Nickname>
      </ProfileContainer>

      <Title>{props.data.questionTitle}</Title>
      <Explain>{props.data.questionExplain}</Explain>

      {props.data.questionContents !== '' ? (
        <Contents>
          <Length>첨삭내용 ( {contentLength}자 )</Length>
          {props.data.questionContents}
        </Contents>
      ) : (
        <FileButton href={props.data.questionUrl} target="_blank" download>
          첨부파일보기
        </FileButton>
      )}

      {myId === props.data.memberId && (
        <ButtonContainer>
          <UpdateButton id={props.data.questionId} />
        </ButtonContainer>
      )}
    </QuestionContainer>
  );
};

// 질문 컴포넌트 style
const QuestionContainer = styled.div`
  max-width: 985px;
  margin: 100px auto 50px;
  padding: 30px;
  display: flex;
  flex-direction: column;
  gap: 22px 0;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 15px;
  box-shadow: 0px 5px 20px 2px rgba(48, 70, 89, 0.15);
`;

const Infomation = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const BadgeContainer = styled.div`
  display: flex;
  flex-direction: row;
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

const Title = styled.h1`
  margin: 0;
  font-size: ${({ theme }) => theme.fontSizes.title};
  font-weight: bold;
  line-height: 36px;
`;
const Explain = styled.p`
  margin: 0 0 50px 0;
  font-size: 16px;
  font-weight: normal;
  line-height: 24px;
`;

const Contents = styled.div`
  padding: 30px 22px;
  position: relative;
  background-color: ${({ theme }) => theme.colors.whiteF4};
  font-size: ${({ theme }) => theme.fontSizes.body};
  font-weight: normal;
  line-height: 27px;
  border-radius: 10px;
`;
const Length = styled.p`
  position: absolute;
  top: -35px;
  left: 22px;
  font-size: ${({ theme }) => theme.fontSizes.body};
  font-weight: bold;
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

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  justify-content: flex-end;
`;

export default Question;
