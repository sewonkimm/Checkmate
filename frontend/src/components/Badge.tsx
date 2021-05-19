/* eslint-disable react/require-default-props */
/* eslint-disable react/destructuring-assignment */
import React, { ReactElement, useState, useEffect } from 'react';
import styled from 'styled-components';

type PropsType = {
  content: string | number;
  date: string;
  color?: string;
};

const BadgeComponent = (props: PropsType): ReactElement => {
  const [content, setContent] = useState<string | number>(props.content);
  const [day, setDay] = useState<number>(0);

  useEffect(() => {
    if (props.date !== '') {
      const day = getRemainDate(props.date);
      setContent(`D-${day}`);
      setDay(day);
    } else {
      setContent(props.content);
    }
  }, [props]);

  // D-Day 계산
  const getRemainDate = (endDate: string): number => {
    const setDate = new Date(`${endDate}`);
    const now = new Date(); // 현재 날짜를 new 연산자를 사용해서 Date 객체를 생성

    // D-Day 날짜에서 현재 날짜의 차이를 getTime 메서드를 사용해서 밀리초의 값으로 가져온다.
    const distance = setDate.getTime() - now.getTime();
    const day = Math.floor(distance / (1000 * 60 * 60 * 24)) + 1;
    return day;
  };

  if (props.color !== null && props.color !== undefined) {
    const style = {
      backgroundColor: props.color,
    };
    return <Badge style={style}>{content}</Badge>;
  }
  return <>{day >= 0 && <Badge>{content}</Badge>}</>;
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
