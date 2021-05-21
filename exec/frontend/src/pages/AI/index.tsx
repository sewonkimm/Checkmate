/*
AI/index.tsx
: AI 첨삭
*/

import React, { ReactElement, useState, useEffect } from 'react';
import styled from 'styled-components';
import Loader from 'react-loader-spinner';
import { useTranslation } from 'react-i18next';
import SubHeader from '../../components/SubHeader';
import Header from '../../components/Header';
import Banner from '../../components/Banner';
import { bannerImageAI } from '../../assets';
import Input from './components/Input';
import Result from './components/Result';
import { ResponseAIType, ResponseAIFixType } from '../../entity';
import { checkSpell, recommendWords } from '../../api/ai';

const AI = (): ReactElement => {
  const { t } = useTranslation();
  const [analysed, setAnalysed] = useState<boolean>(false); // 분석결과 컴포넌트가 나오려면 true
  const [original, setOriginal] = useState<string>(''); // 첨삭 원본
  const [result, setResult] = useState<ResponseAIType | null>(null); // 분석 결과
  const [recommendResult, setRecommendResult] = useState<ResponseAIFixType | null>(null); // 추천 결과

  useEffect(() => {
    const fetchAPIs = async () => {
      const data = {
        sentence: original,
      };
      const response = await checkSpell(data);
      const recommendResponse = await recommendWords(data);
      setResult(response);
      setRecommendResult(recommendResponse);
    };

    if (original !== '') {
      fetchAPIs();
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
    return (
      <LoaderWrapper>
        <StyledLoader type="Hearts" color="#F016DE" height={100} width={100} />
        <LoadingText>Loading . . .</LoadingText>
      </LoaderWrapper>
    );
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

const LoaderWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledLoader = styled(Loader)`
  margin: 5em auto 0 auto;
`;
const LoadingText = styled.h2`
  font-size: 24px;
  margin-top: 1em;
`;

export default AI;
