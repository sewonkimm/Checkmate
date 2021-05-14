import React, { useState } from 'react';
import styled from 'styled-components';

import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import SubHeader from '../../components/SubHeader';
import Header from '../../components/Header';
import Banner from '../../components/Banner';
import { bannerImageMate } from '../../assets';
import QuestionGroup from './components/QuestionGroup';
import Filters from './components/Filters';
import { RootState } from '../../modules';

const QuestionList: React.FC = () => {
  const { t } = useTranslation();
  const [isFiltered, setIsFiltered] = useState<boolean>(false);
  const loginUserId: number = useSelector((state: RootState) => state.member).member.memberId;

  const handleMyQuestion = () => {
    setIsFiltered(!isFiltered);
  };

  const bannerData = {
    img: bannerImageMate,
    title: t('mate'),
    description: t('list_description3'),
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
