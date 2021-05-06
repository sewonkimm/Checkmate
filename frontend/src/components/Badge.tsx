import React, { ReactElement } from 'react';
import styled from 'styled-components';

type PropsType = {
  content: string | number;
  date: string;
};

const BadgeComponent = (props: PropsType): ReactElement => {
  let { content } = props;
  const { date } = props;

  // D-Day 계산
  const getRemainDate = (endDate: string): number => {
    const setDate = new Date(`${endDate}`);
    const now = new Date(); // 현재 날짜를 new 연산자를 사용해서 Date 객체를 생성

    // D-Day 날짜에서 현재 날짜의 차이를 getTime 메서드를 사용해서 밀리초의 값으로 가져온다.
    const distance = setDate.getTime() - now.getTime();
    const day = Math.floor(distance / (1000 * 60 * 60 * 24));
    return day;
  };

  if (date !== '') {
    const day = getRemainDate(date);
    content = `D-${day}`;
  }

  return <Badge>{content}</Badge>;
};

const Badge = styled.span`
  font-size: 16px;
  margin-right: 12px;
  border-radius: 20px;
  padding: 4px 15px;
  color: ${({ theme }) => theme.colors.white};
  background-color: ${({ theme }) => theme.colors.secondary};
`;

export default BadgeComponent;
