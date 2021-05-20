/*
Home/Index.tsx
: 랜딩페이지
*/

import React, { ReactElement, useState } from 'react';
import { Motion, spring } from 'react-motion';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import SubHeader from '../../components/SubHeader';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Button from './components/Button';
import Video from './components/Video';
import IntroMessenger from './components/IntroMessenger';
import { mainImage, mainShape1, mainShape2 } from '../../assets';

const Home = (): ReactElement => {
  const { t } = useTranslation();

  // mouse move event 관련 변수
  let x = 0;
  let y = 0;
  const speed = 0.01;
  const [MX, setMX] = useState<number>(0);
  const [MY, setMY] = useState<number>(0);

  const handleMousemove = (e: React.MouseEvent<HTMLElement>): void => {
    x = e.clientX - window.innerWidth / 2;
    y = e.clientY - window.innerHeight / 2;
    setMX(MX + (x - MX) * speed);
    setMY(MY + (y - MY) * speed);
  };

  return (
    <HomeContainer onMouseMove={handleMousemove}>
      <SubHeader />
      <Header />

      <TopContainer>
        <TitleWrapper>
          <Title>{t('home_title')}</Title>
          <SubTitle>{t('home_description')}</SubTitle>

          <ButtonContainer>
            <Button type="secondary" text={t('home_button_ai')} />
            <Button type="primary" text={t('home_button_mate')} />
          </ButtonContainer>
        </TitleWrapper>

        <ImageWrapper>
          <Motion
            style={{
              mx: spring((MX / 14) * -1),
              my: spring((MY / 14) * -1),
            }}
          >
            {(style) => (
              <MainImage
                src={mainImage}
                alt="mainImage"
                style={{
                  transform: `translate(${style.mx}px, ${style.my}px)`,
                }}
              />
            )}
          </Motion>

          <Motion
            style={{
              mx: spring(MX / 12),
              my: spring(MY / 12),
            }}
          >
            {(style) => (
              <Shape1
                src={mainShape1}
                alt="shape1"
                style={{
                  transform: `translate(${style.mx}px, ${style.my}px)`,
                }}
              />
            )}
          </Motion>

          <Motion
            style={{
              mx: spring((MX / 8) * -1),
              my: spring((MY / 8) * -1),
            }}
          >
            {(style) => (
              <Shape2
                src={mainShape2}
                alt="shape2"
                style={{
                  transform: `translate(${style.mx}px, ${style.my}px)`,
                }}
              />
            )}
          </Motion>
        </ImageWrapper>
      </TopContainer>

      <IntroMessenger />

      <Video url="https://www.youtube.com/embed/I0TTEREEJYU?controls=0" />

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

const TopContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  padding: 100px;
  justify-content: center;
`;

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
  margin: 0;
  padding-top: 50px;
`;
const Title = styled.h1`
  margin: 0;
  font-size: ${({ theme }) => theme.fontSizes.h2};
  font-weight: bold;
  line-height: 70px;
  white-space: pre-wrap;
`;
const SubTitle = styled.p`
  margin-top: 20px;
  white-space: pre-wrap;
  line-height: 30px;
  font-size: ${({ theme }) => theme.fontSizes.body};
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 20px;
  margin: 50px 0 80px;
`;

const ImageWrapper = styled.div`
  position: relative;
  margin-left: 100px;
  width: 578px;
`;
const MainImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
`;
const Shape1 = styled.img`
  position: absolute;
  bottom: 120px;
  left: -30px;
`;
const Shape2 = styled.img`
  position: absolute;
  top: 50px;
  left: 400px;
`;
export default Home;
