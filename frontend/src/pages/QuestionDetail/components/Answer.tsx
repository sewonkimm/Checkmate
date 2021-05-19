/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/destructuring-assignment */
/*
QuestionDetail/components/Answer.tsx
: 질문 상세 조회 페이지의 답변 컴포넌트
*/

import React, { ReactElement, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { QuestionType, AnswerType, MemberType } from '../../../entity';
import { profileImage } from '../../../assets';
import { getMemberInfo } from '../../../api/member';
import { DeleteAPI } from '../../../api/answer';
import Diff from '../../../components/Diff';
import BadgeComponent from '../../../components/Badge';
import ReviewModal from './ReviewModal';

type PropsType = {
  id: number; // memberID
  question: QuestionType;
  answer: AnswerType;
};

const Answer = (props: PropsType): ReactElement => {
  const { t } = useTranslation();
  const router = useHistory();
  const { id, question, answer } = props;
  const MySwal = withReactContent(Swal);
  const [memberInfo, setMemberInfo] = useState<MemberType>();
  const [showModal, setShowModal] = useState<boolean>(false);

  // 작성일 문자열 다듬기
  let createdDate;
  if (answer.answerDate !== undefined) {
    createdDate = answer.answerDate.split('T')[0].replaceAll('-', '.');
  }

  useEffect(() => {
    // 작성자 정보
    const fetchMemberInfo = async () => {
      const member = await getMemberInfo(`members/${answer.memberId}`);
      if (member !== null) {
        setMemberInfo(member);
      }
    };
    fetchMemberInfo();
  }, []);

  // 답변 수정(추가 기능)

  // 답변 삭제
  const handleDelete = () => {
    MySwal.fire({
      text: t('answer_msg_delete'),
      icon: 'warning',
      confirmButtonText: t('yes'),
      cancelButtonText: t('no'),
      showCancelButton: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await DeleteAPI(`answers/delete/${answer.answerId}`);

        if (response === 200) {
          router.go(0);
        }
      }
    });
  };

  // 답변 채택
  const handleChoose = () => {
    MySwal.fire({
      text: t('answer_msg_pick'),
      icon: 'question',
      confirmButtonText: t('yes'),
      cancelButtonText: t('no'),
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        // 리뷰 작성
        setShowModal(true);
      }
    });
  };

  return (
    <AnswerContainer>
      {answer.answerSelect === 1 ? (
        // 답변 이 채택된 경우
        <Infomation>
          <BadgeContainer>
            <BadgeComponent content="채택됨" date="" color="#F016DE" />
          </BadgeContainer>
          <div>
            {t('date')} {createdDate}
          </div>
        </Infomation>
      ) : (
        // 답변이 채택되지 않은 경우
        <WriteDate>
          {t('date')} {createdDate}
        </WriteDate>
      )}

      {/* 답변 작성자 정보 */}
      <ProfileContainer>
        {memberInfo?.memberProfileUrl === '' ? (
          <ProfileImage src={profileImage} alt="profile" />
        ) : (
          <ProfileImage src={memberInfo?.memberProfileUrl} alt="profile" />
        )}

        <Nickname>{memberInfo?.memberNickname}</Nickname>
      </ProfileContainer>

      {answer.answerExplain !== '' && <Explain>{answer.answerExplain}</Explain>}

      <Diff origin={question.questionContents} input={answer.answerContents} />

      {/* 첨부파일 보기 */}
      {answer.answerUrl !== null && (
        <FileButton href={answer.answerUrl} target="_blank" download>
          {t('detail_button_file')}
        </FileButton>
      )}

      {/* 답변 작성자가 보는 경우 삭제 버튼 */}
      {id === answer.memberId && answer.answerSelect === 0 && (
        <ButtonContainer>
          {/* <Button>{t('update')}</Button> */}
          <Button onClick={handleDelete}>{t('delete')}</Button>
        </ButtonContainer>
      )}

      {/* 질문 작성자가 보는 경우 채택 버튼 */}
      {id === question.memberId && question.questionStatus === 0 && (
        <ButtonContainer>
          <ChooseButton onClick={handleChoose}>{t('detail_button_pick')}</ChooseButton>
        </ButtonContainer>
      )}

      {/* 리뷰 Modal */}
      {showModal && answer.answerId !== undefined && (
        <ReviewModal answerId={answer.answerId} questionId={answer.questionId} setShowModal={setShowModal} />
      )}
    </AnswerContainer>
  );
};

// 답변 컴포넌트 style
const AnswerContainer = styled.div`
  width: 100%;
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

const Infomation = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const BadgeContainer = styled.div`
  display: flex;
  flex-direction: row;
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
  margin: 0;
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

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  justify-content: flex-end;
`;

const Button = styled.button`
  width: 130px;
  height: 53px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  font-size: 20px;
  font-weight: bold;
  letter-spacing: 0.005em;
  cursor: pointer;
  background-color: ${({ theme }) => theme.colors.white};
  border: 2px solid ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.primary};
`;
const ChooseButton = styled.button`
  width: 127px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  font-size: ${({ theme }) => theme.fontSizes.body};
  font-weight: bold;
  letter-spacing: 0.005em;
  cursor: pointer;
  background-color: rgba(240, 22, 222, 0.4);
  color: ${({ theme }) => theme.colors.white};

  &:hover {
    background-color: ${({ theme }) => theme.colors.accent};
  }
`;

export default Answer;
