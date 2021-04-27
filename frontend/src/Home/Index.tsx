/*
Home/Index.tsx
: 랜딩페이지
*/

import React from 'react';
import styled from 'styled-components';

const Home: React.FC = () => {
  return <HomeContainer>Home 글꼴적용</HomeContainer>;
};
export default Home;

const HomeContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.accent};
  font-size: ${({ theme }) => theme.fontSizes.h1};
`;
