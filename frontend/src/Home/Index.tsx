/*
Home/Index.tsx
: 랜딩페이지
*/

import React, { ReactElement, useState } from 'react';
import styled from 'styled-components';
import SubHeader from '../components/SubHeader';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Button from './components/Button';
import Video from './components/Video';
import { mainImage1 } from '../assets';

const Home = (): ReactElement => {
  const [title, setTitle] = useState('레포트 체크해줄 사람 어디 없나?');
  const [subTitle, setSubTitle] = useState('체크메이트가 당신의 레포트를 체크해드립니다!');

  return (
    <HomeContainer>
      <SubHeader />
      <Header />
      <MainImage src={mainImage1} alt="mainIamge" />
      <Title>{title}</Title>
      <SubTitle>{subTitle}</SubTitle>

      <ButtonContainer>
        <Button type="secondary" text="AI로 체크받기" />
        <Button type="primary" text="메이트에게 체크받기" />
      </ButtonContainer>

      <Video url="https://www.youtube.com/embed/G9Bmp6NuHSI?controls=0" />

      <Footer />
    </HomeContainer>
  );
};

const HomeContainer = styled.div`
  overflow: hidden;
  text-align: center;
  background-color: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.black};
  font-size: ${({ theme }) => theme.fontSizes.h1};
`;

const MainImage = styled.img`
  width: 100%;
`;
const Title = styled.h1`
  margin: 80px 0 0 0;
  font-size: ${({ theme }) => theme.fontSizes.h1};
  font-weight: bold;
`;
const SubTitle = styled.p`
  margin-top: 20px;
  font-size: ${({ theme }) => theme.fontSizes.title};
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 20px;
  margin: 50px 0 80px;
`;

export default Home;
