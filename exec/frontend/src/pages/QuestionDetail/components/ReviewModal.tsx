/*
QuestionDetail/components/Answer.tsx
: 질문 상세 조회 페이지의 답변 컴포넌트
*/

import React, { ReactElement, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { useTranslation } from 'react-i18next';
import Rating from 'react-rating';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ReviewType } from '../../../entity';
import { WriteReviewAPI, chooseAnswerAPI } from '../../../api/answer';
import { star, starEmpty } from '../../../assets';

type PropsType = {
  answerId: number;
  questionId: number;
  setShowModal: (value: boolean) => void;
};

const ReviewModal = (props: PropsType): ReactElement => {
  const { t } = useTranslation();
  const router = useHistory();
  const { answerId, questionId } = props;
  const [score, setScore] = useState<number>(0);
  const [content, setContent] = useState<string>('');

  const handleRating = (value: number) => {
    setScore(value);
  };
  const handleContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value.slice(0, 500)); // 500자 제한
  };

  // 유효성 검사
  const validate = (data: ReviewType): boolean => {
    if (data.reviewContents.length === 0) {
      toast.warn(t('answer_msg_review'), {
        position: 'bottom-right',
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return false;
    }
    return true;
  };

  const chooseAnswer = async (data: ReviewType) => {
    const response = await chooseAnswerAPI(`choose/${questionId}/${answerId}`, data);
    if (response === 200) {
      router.go(0);
    }
  };

  const submitReview = async () => {
    const data: ReviewType = {
      answerId,
      reviewCategory: 0,
      reviewContents: content,
      reviewScore: score,
    };

    if (validate(data)) {
      const response = await WriteReviewAPI(data);
      if (response === 200) {
        props.setShowModal(false);

        chooseAnswer(data);
      }
    }
  };

  const close = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    props.setShowModal(false);
  };

  return (
    <ModalContainer>
      <ModalBackground onClick={close} />
      <Modal>
        <Rating
          initialRating={score}
          emptySymbol={<img src={starEmpty} className="icon" alt="starEmpty" />}
          fullSymbol={<img src={star} className="icon" alt="star" />}
          onChange={handleRating}
        />
        <Textarea rows={3} value={content} onChange={handleContent} placeholder={t('review_msg_placeholder')} />
        <SubmitButton onClick={submitReview} type="submit">
          {t('answer_button_review')}
        </SubmitButton>
      </Modal>

      <ToastContainer
        position="bottom-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </ModalContainer>
  );
};

// 답변 컴포넌트 style
const ModalShow = keyframes`
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
`;

const ModalContainer = styled.div`
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

const ModalBackground = styled.div`
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;
  background-color: rgba(0, 0, 0, 0.6);
  animation: ${ModalShow} 0.3s;
`;

const Modal = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px 30px;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 15px;
  z-index: 100;
`;

const Textarea = styled.textarea`
  width: 100%;
  margin: 30px;
  padding: 15px 20px;
  font-size: ${({ theme }) => theme.fontSizes.body};
  font-weight: normal;
  line-height: 30px;
  border: 2px solid ${({ theme }) => theme.colors.whiteD9};
  border-radius: 8px;
  resize: none;

  &::placehorder {
    color: ${({ theme }) => theme.colors.whiteD9};
  }
`;

const SubmitButton = styled.button`
  padding: 15px 50px;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  font-size: 16px;
  font-weight: bold;
  border-radius: 40px;
  cursor: pointer;
`;

export default ReviewModal;
