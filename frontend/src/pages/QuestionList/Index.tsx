import React from 'react';
import styled from 'styled-components';
import SubHeader from '../../components/SubHeader';
import Header from '../../components/Header';
import ImagePath from '../../assets/review_img.jpg';
import QuestionGroup from './components/QuestionGroup';
import Filters from './components/Filters';

const QuestionList: React.FC = () => {
  return (
    <HomeContainer>
      <SubHeader />
      <Header />
      <BannerSection img={ImagePath}>
        <BannerTitle>Help Center</BannerTitle>
        <BannerDescription>
          획득한 포인트로 첨삭 신청이 가능합니다
          <br />
          또한 첨삭을 도와주고, 포인트를 획득하세요 😇
        </BannerDescription>
      </BannerSection>
      <Filters />
      <QuestionGroup />
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
const BannerSection = styled.section<{ img: string }>`
  width: 100%;
  height: 300px;
  background: linear-gradient(rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.3)), url(${(props) => props.img});
  background-size: cover;
  background-position: 50% 47%;
  padding: 12px;
`;
const BannerTitle = styled.h3`
  font-family: 'Kirang Haerang', cursive;
  margin: 35px 0 35px 0;
  font-size: 56px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.white};
`;
const BannerDescription = styled.p`
  font-size: 28px;
  color: ${({ theme }) => theme.colors.white};
`;

export default QuestionList;
