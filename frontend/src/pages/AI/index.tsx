/*
AI/index.tsx
: AI 첨삭
*/

import React, { ReactElement } from 'react';
import styled from 'styled-components';
import SubHeader from '../../components/SubHeader';
import Header from '../../components/Header';
import Banner from '../../components/Banner';
import { bannerImageAI } from '../../assets';

const AI = (): ReactElement => {
  const bannerData = {
    img: bannerImageAI,
    title: 'AI 첨삭',
    description: '인공지능이 여러분의 글을 분석해 고칠 점들을 콕콕 찝어드려요 🤖',
  };

  return (
    <>
      <SubHeader />
      <Header />
      <Banner banner={bannerData} />
    </>
  );
};

export default AI;
