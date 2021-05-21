/* eslint-disable react-hooks/exhaustive-deps */
import React, { ReactElement, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { ToastContainer, toast } from 'react-toastify';
import { MyQuestionAPI } from '../../../api/question';
import { ResponseMyQuestionListType } from '../../../entity/index';

const MyQuestions = (): ReactElement => {
  const { t } = useTranslation();

  const userId = Number(localStorage.getItem('memberId'));
  const [offset, setOffset] = useState<number>(0);
  const [limit] = useState<number>(3);
  const [totalAsk, setTotalAsk] = useState<number>(0);
  const [totalReply, setTotalReply] = useState<number>(0);
  const [questionList, setQuestionList] = useState<ResponseMyQuestionListType[]>([]);
  const [getMoreStatus, setGetMoreStatus] = useState<boolean>(true);

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
        toast.error(t('my_msg_failed_post'), {
          position: 'bottom-right',
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    };
    fetchMyQuestion();
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
      setGetMoreStatus(true);
      setOffset(offset + 1);
    } else {
      setGetMoreStatus(false);
    }
  };

  return (
    <Questions>
      <HeaderTitle>My Questions</HeaderTitle>
      <HeaderCounts>
        <div>
          {totalAsk}
          {t('my_count_question')}
        </div>
      </HeaderCounts>
      <ListHeader>
        <Title>{t('title')}</Title>
        <AnswerCnt>{t('my_count_reply')}</AnswerCnt>
        <Created>{t('date')}</Created>
      </ListHeader>

      {questionList.length > 0 ? (
        questionList.map((item) => {
          return (
            <QuestionLists to={`/question/${item.question.questionId}`}>
              <MyTitle>
                {item.question.questionPoint > 0 && <PointSpan>{item.question.questionPoint}</PointSpan>}
                {item.question.questionTitle}
              </MyTitle>
              <AnswerCnt>{item.answerCount}</AnswerCnt>
              <Created>{dateSplit(item.question.questionDate)}</Created>
            </QuestionLists>
          );
        })
      ) : (
        <NoQuestionMsg>{t('no_post')}</NoQuestionMsg>
      )}
      {getMoreStatus ? (
        <ExtensionBtn onClick={handleGetMoreBtn}>{t('my_button_more_question')}</ExtensionBtn>
      ) : (
        <FailExtensionBtn onClick={handleGetMoreBtn}>{t('my_button_more_question')}</FailExtensionBtn>
      )}

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
const NoQuestionMsg = styled.h3`
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
const QuestionLists = styled(Link)`
  display: flex;
  padding: 0.4em;
  font-size: 18px;
  cursor: pointer;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.black};
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
  transition: all 300ms ease-out;

  &: hover {
    cursor: pointer;
    transform: translateY(-8px);
  }
`;
const FailExtensionBtn = styled.button`
  width: 100%;
  margin: 30px 0 0 0;
  background: #038efc;
  border-radius: 5px;
  padding: 11px 15px;
  color: ${({ theme }) => theme.colors.white};
  font-size: 18px;
  font-weight: 700;
  opacity: 0.5;
`;

export default MyQuestions;
