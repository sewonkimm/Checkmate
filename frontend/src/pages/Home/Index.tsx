/*
Home/Index.tsx
: 랜딩페이지
*/

import React, { ReactElement } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import SubHeader from '../../components/SubHeader';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Button from './components/Button';
import Video from './components/Video';
import { mainImage1 } from '../../assets';

const Home = (): ReactElement => {
  const { t } = useTranslation();

  return (
    <HomeContainer>
      <SubHeader />
      <Header />
      <MainImage src={mainImage1} alt="mainIamge" />
      <Title>{t('home_title')}</Title>
      <SubTitle>{t('home_description')} 끝!</SubTitle>

      <ButtonContainer>
        <Button type="secondary" text={t('home_button_ai')} />
        <Button type="primary" text={t('home_button_mate')} />
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
  white-space: pre-wrap;
  line-height: 36px;
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
