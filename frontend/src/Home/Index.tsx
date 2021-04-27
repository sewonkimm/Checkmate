/*
Home/Index.tsx
: 랜딩페이지
*/

import React from 'react';
import styled from 'styled-components';
import SubHeader from './components/SubHeader';
import Header from './components/Header';

const Home: React.FC = () => {
  return (
    <HomeContainer>
      <SubHeader />
      <Header />
      본문
    </HomeContainer>
  );
};

const HomeContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.black};
  font-size: ${({ theme }) => theme.fontSizes.h1};
`;

export default Home;
