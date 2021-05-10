import React, { useState } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import SubHeader from '../../components/SubHeader';
import Header from '../../components/Header';
import Banner from '../../components/Banner';
import { bannerImageMate } from '../../assets';
import QuestionGroup from './components/QuestionGroup';
import Filters from './components/Filters';
import { RootState } from '../../modules';

const QuestionList: React.FC = () => {
  const [isFiltered, setIsFiltered] = useState<boolean>(false);
  const loginUserId: number = useSelector((state: RootState) => state.member).member.memberId;

  const handleMyQuestion = () => {
    setIsFiltered(!isFiltered);
  };

  const bannerData = {
    img: bannerImageMate,
    title: '원어민 첨삭',
    description:
      '자연스러운 한국어 표현을 위해 원어민 메이트들이 도와드려요!\n질문을 올리고, 메이트들의 답변을 기다리세요 😇',
  };

  return (
    <HomeContainer>
      <SubHeader />
      <Header />
      <Banner banner={bannerData} />
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

export default QuestionList;
