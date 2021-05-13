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
import { ResponseAIType } from '../../entity';
import checkSpell from '../../api/ai';

const AI = (): ReactElement => {
  const { t } = useTranslation();
  const [analysed, setAnalysed] = useState<boolean>(false); // 분석결과 컴포넌트가 나오려면 true
  const [original, setOriginal] = useState<string>(''); // 첨삭 원본
  const [result, setResult] = useState<ResponseAIType | null>(null); // 첨삭 결과

  useEffect(() => {
    const fetchCheckSpell = async () => {
      const data = {
        sentence: original,
      };
      const response = await checkSpell(data);
      setResult(response);
    };

    if (original !== '') {
      fetchCheckSpell();
    }
  }, [original]);

  const bannerData = {
    img: bannerImageAI,
    title: t('ai'),
    description: t('ai_description'),
  };

  const ResultComponent = (): JSX.Element => {
    if (result !== null) {
      return <Result reset={reset} data={result} />;
    }
    return <>에러</>;
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
`;
export default AI;
