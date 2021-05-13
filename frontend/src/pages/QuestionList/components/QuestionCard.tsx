/* eslint-disable react/destructuring-assignment */
import React, { ReactElement } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { ResponseQuestionType } from '../../../entity';
import BadgeComponent from '../../../components/Badge';

type PropsType = {
  question: ResponseQuestionType;
};

const Review = (props: PropsType): ReactElement => {
  const { t } = useTranslation();
  const history = useHistory();

  const { answerCount, question } = props.question;
  const createdDate = question.questionDate.split('T')[0];

  // 해당 질문 상세 조회 페이지로 이동
  const goDetail = () => {
    history.push(`/question/${question.questionId}`);
  };

  return (
    <QuestionContainer onClick={goDetail}>
      <Header>
        <BadgeContainer>
          {question.questionPoint > 0 && <BadgeComponent content={question.questionPoint} date="" />}
          <BadgeComponent content="" date={question.questionEndDate} />
        </BadgeContainer>
      </Header>
      <Title>{question.questionTitle}</Title>
      <Body>{question.questionExplain}</Body>
      <Footer>
        <FooterText>
          {t('mate_list_answer')} {answerCount}
        </FooterText>
        <FooterText>
          {t('mate_date')} {createdDate}
        </FooterText>
      </Footer>
    </QuestionContainer>
  );
};
const QuestionContainer = styled.div`
  box-shadow: 0px 5px 20px 2px rgba(48, 70, 89, 0.15);
  border-radius: 10px;
  padding: 0.4em;
  margin: 0.5em 0;
  cursor: pointer;
`;
const Header = styled.div`
  display: flex;
  flex-direction: start;
  font-weight: 600;
  font-size: 16px;
`;

const BadgeContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const Title = styled.h2`
  font-weight: 700;
  font-size: 1.4rem;
  text-align: start;
`;
const Body = styled.h3`
  font-weight: 400;
  font-size: 1.2rem;
  text-align: start;
`;
const Footer = styled.footer`
  font-weight: 400;
  font-size: 1.1rem;
  text-align: end;
`;
const FooterText = styled.p`
  margin: 0;
  margin-top: 0.3em;
`;

export default Review;
