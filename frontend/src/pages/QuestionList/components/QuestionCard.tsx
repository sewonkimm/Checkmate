import React, { ReactElement } from 'react';
import styled from 'styled-components';
import { QuestionResponseType } from '../../../entity';

type PropsType = {
  question: QuestionResponseType;
};

const Review = (props: PropsType): ReactElement => {
  const { question } = props;

  // D-Day 계산
  const getRemainDate = (endDate: string): number => {
    const setDate = new Date(`${endDate}`);
    const now = new Date(); // 현재 날짜를 new 연산자를 사용해서 Date 객체를 생성

    // D-Day 날짜에서 현재 날짜의 차이를 getTime 메서드를 사용해서 밀리초의 값으로 가져온다.
    const distance = setDate.getTime() - now.getTime();
    const day = Math.floor(distance / (1000 * 60 * 60 * 24));
    return day;
  };

  const day = getRemainDate(question.questionEndDate);
  const createdDate = question.questionDate.split('T')[0];

  return (
    <ReviewWrap>
      <Header>
        <ReviewHeader>{question.questionPoint}</ReviewHeader>
        <ReviewHeader>D-{day}</ReviewHeader>
      </Header>
      <Title>{question.questionTitle}</Title>
      <Body>{question.questionExplain}</Body>
      <Footer>
        <FooterText>답변 2</FooterText>
        <FooterText>작성일 {createdDate}</FooterText>
      </Footer>
    </ReviewWrap>
  );
};
const ReviewWrap = styled.div`
  box-shadow: 0px 5px 20px 2px rgba(48, 70, 89, 0.15);
  border-radius: 10px;
  padding: 0.4em;
  margin: 0.5em 0;
`;
const Header = styled.div`
  display: flex;
  flex-direction: start;
  font-weight: 600;
  font-size: 16px;
`;
const ReviewHeader = styled.span`
  font-size: 16px;
  margin-right: 12px;
  border-radius: 20px;
  padding: 4px 15px;
  color: ${({ theme }) => theme.colors.white};
  background-color: #038efc;
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
