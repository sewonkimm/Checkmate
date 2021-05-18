/*
QuestionDetail/components/Question.tsx
: 질문 상세 조회 페이지의 질문 컴포넌트
*/

import React, { ReactElement, useState, useEffect } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { QuestionType, MemberType } from '../../../entity';
import { getMemberInfo } from '../../../api/member';
import { profileImage } from '../../../assets';
import BadgeComponent from '../../../components/Badge';
import UpdateButton from './UpdateButton';

type PropsType = {
  id: number;
  question: QuestionType;
};

const Question = (props: PropsType): ReactElement => {
  const { t } = useTranslation();
  const { id, question } = props;
  const [memberInfo, setMemberInfo] = useState<MemberType>();

  useEffect(() => {
    const fetchMemberInfo = async () => {
      const member = await getMemberInfo(`members/${question.memberId}`);
      if (member !== null) {
        setMemberInfo(member);
      }
    };
    fetchMemberInfo();
  }, [question]);

  // 작성일 문자열 다듬기
  const createdDate = question.questionDate.split('T')[0].replaceAll('-', '.');

  // 첨삭내용 문자 수
  const contentLength = question.questionContents.length;

  return (
    <QuestionContainer>
      <Infomation>
        <BadgeContainer>
          {question.questionPoint > 0 && <BadgeComponent content={question.questionPoint} date="" />}
          <BadgeComponent content="" date={question.questionEndDate} />
        </BadgeContainer>
        <div>
          {t('date')} {createdDate}
        </div>
      </Infomation>

      <ProfileContainer>
        {memberInfo?.memberProfileUrl === '' ? (
          <ProfileImage src={profileImage} alt="profile" />
        ) : (
          <ProfileImage src={memberInfo?.memberProfileUrl} alt="profile" />
        )}

        <Nickname>{memberInfo?.memberNickname}</Nickname>
      </ProfileContainer>

      <Title>{question.questionTitle}</Title>
      <Explain>{question.questionExplain}</Explain>

      {question.questionContents !== '' && (
        <Contents>
          <Length>
            {t('content')} ( {contentLength} )
          </Length>
          {question.questionContents}
        </Contents>
      )}

      {/* 첨부파일 보기 */}
      {question.questionUrl !== null && (
        <FileButton href={question.questionUrl} target="_blank" download>
          {t('detail_button_file')}
        </FileButton>
      )}

      {/* 글 작성자만 수정 버튼 보기 */}
      {id === question.memberId && (
        <ButtonContainer>
          <UpdateButton id={question.questionId} />
        </ButtonContainer>
      )}
    </QuestionContainer>
  );
};

// 질문 컴포넌트 style
const QuestionContainer = styled.div`
  width: 100%;
  margin: 20px auto 50px;
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
  line-height: 30px;
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
