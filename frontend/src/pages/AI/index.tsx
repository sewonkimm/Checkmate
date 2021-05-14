/*
AI/index.tsx
: AI 첨삭
*/

import React, { ReactElement, useState, useEffect } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import SubHeader from '../../components/SubHeader';
import Header from '../../components/Header';
import Banner from '../../components/Banner';
import { bannerImageAI } from '../../assets';
import Input from './components/Input';
import Result from './components/Result';
<<<<<<< HEAD
import { ResponseAIType, ResponseAIFixType } from '../../entity';
import { checkSpell, recommendWords } from '../../api/ai';
=======
import { ResponseAIType } from '../../entity';
import checkSpell from '../../api/ai';
>>>>>>> 0915456efa981aa82785d3df3badedbc3904e7dc

const AI = (): ReactElement => {
  const { t } = useTranslation();
  const [analysed, setAnalysed] = useState<boolean>(false); // 분석결과 컴포넌트가 나오려면 true
  const [original, setOriginal] = useState<string>(''); // 첨삭 원본
<<<<<<< HEAD
  const [result, setResult] = useState<ResponseAIType | null>(null); // 분석 결과
  const [recommendResult, setRecommendResult] = useState<ResponseAIFixType | null>(null); // 추천 결과

  useEffect(() => {
    const fetchAPIs = async () => {
=======
  const [result, setResult] = useState<ResponseAIType | null>(null); // 첨삭 결과

  useEffect(() => {
    const fetchCheckSpell = async () => {
>>>>>>> 0915456efa981aa82785d3df3badedbc3904e7dc
      const data = {
        sentence: original,
      };
      const response = await checkSpell(data);
<<<<<<< HEAD
      const recommendResponse = await recommendWords(data);
      setResult(response);
      setRecommendResult(recommendResponse);
    };

    if (original !== '') {
      fetchAPIs();
=======
      setResult(response);
    };

    if (original !== '') {
      fetchCheckSpell();
>>>>>>> 0915456efa981aa82785d3df3badedbc3904e7dc
    }
  }, [original]);

  const bannerData = {
    img: bannerImageAI,
    title: t('ai'),
    description: t('ai_description'),
  };

  const ResultComponent = (): JSX.Element => {
    if (result !== null && recommendResult !== null) {
      return <Result reset={reset} graphData={result} recommendData={recommendResult} />;
    }
    return <>loading...</>;
  };

  const reset = () => {
    setAnalysed(false);
    setOriginal('');
    setResult(null);
  };

  return (
    <AIContainer>
      <SubHeader />
      <Header />
      <Banner banner={bannerData} />

      {analysed ? ResultComponent() : <Input setOriginal={setOriginal} setAnalysed={setAnalysed} />}
    </AIContainer>
  );
};

const AIContainer = styled.div`
  width: 100%;
  padding: 0;
`;
export default AI;
