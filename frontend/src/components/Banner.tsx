/*
components/Banner.tsx
: 각 페이지 맨 위에 나오는 배너
*/

import React, { ReactElement } from 'react';
import styled from 'styled-components';

type PropsType = {
  banner: {
    img: string;
    title: string;
    description: string;
  };
};

const Banner = (props: PropsType): ReactElement => {
  const { banner } = props;

  return (
    <BannerContainer img={banner.img}>
      <Title>{banner.title}</Title>
      <Description>{banner.description}</Description>
    </BannerContainer>
  );
};

const BannerContainer = styled.section<{ img: string }>`
  width: 100%;
  height: 300px;
  background: linear-gradient(rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.3)), url(${(props) => props.img});
  background-size: cover;
  background-position: 50% 47%;
  padding: 12px;
`;
const Title = styled.h3`
  margin: 35px 0 35px 0;
  font-size: 56px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.white};
`;
const Description = styled.p`
  font-size: 28px;
  color: ${({ theme }) => theme.colors.white};
  line-height: 36px;
`;
export default Banner;
