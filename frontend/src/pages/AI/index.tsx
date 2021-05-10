/*
AI/index.tsx
: AI 첨삭
*/

import React, { ReactElement, useState, useEffect } from 'react';
import SubHeader from '../../components/SubHeader';
import Header from '../../components/Header';
import Banner from '../../components/Banner';
import { bannerImageAI } from '../../assets';
import Input from './components/Input';
import Result from './components/Result';
import checkSpell from '../../api/ai';

const AI = (): ReactElement => {
  const [analysed, setAnalysed] = useState<boolean>(false); // 분석결과 컴포넌트가 나오려면 true
  const [original, setOriginal] = useState<string>('a');

  useEffect(() => {
    const fetchCheckSpell = async () => {
      const data = {
        sentence: original,
      };
      //   const response = await checkSpell(data);
    };

    if (original !== '') {
      fetchCheckSpell();
    }
  }, [original]);

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

      {analysed ? (
        // <Result setOriginal={setOriginal} setAnalysed={setAnalysed} />
        <>분석 결과{original}</>
      ) : (
        <Input setOriginal={setOriginal} setAnalysed={setAnalysed} />
      )}
    </>
  );
};

export default AI;
