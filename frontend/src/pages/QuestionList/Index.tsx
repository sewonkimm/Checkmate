import React, { useState } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import SubHeader from '../../components/SubHeader';
import Header from '../../components/Header';
import { bannerImage } from '../../assets';
import QuestionGroup from './components/QuestionGroup';
import Filters from './components/Filters';
import { RootState } from '../../modules';

const QuestionList: React.FC = () => {
  const [isFiltered, setIsFiltered] = useState<boolean>(false);
  const loginUserId: number = useSelector((state: RootState) => state.member).member.memberId;

  const handleMyQuestion = () => {
    setIsFiltered(!isFiltered);
  };

  return (
    <HomeContainer>
      <SubHeader />
      <Header />
      <BannerSection img={bannerImage}>
        <BannerTitle>원어민 첨삭</BannerTitle>
        <BannerDescription>
          자연스러운 한국어 표현을 위해 원어민 메이트들이 도와드려요!
          <br />
          질문을 올리고, 메이트들의 답변을 기다리세요 😇
        </BannerDescription>
      </BannerSection>
      <Filters handleMyQuestion={handleMyQuestion} id={loginUserId} />
      <QuestionGroup isFiltered={isFiltered} id={loginUserId} />
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
  margin: 35px 0 35px 0;
  font-size: 56px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.white};
`;
const BannerDescription = styled.p`
  font-size: 28px;
  color: ${({ theme }) => theme.colors.white};
  line-height: 36px;
`;

export default QuestionList;
