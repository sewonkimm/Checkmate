/*
AI/components/Result.tsx
: AI 첨삭 페이지 분석 결과 컴포넌트
*/

import React, { ReactElement } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import Diff from '../../../components/Diff';
import { ResponseAIType, ResponseAIFixType } from '../../../entity';
import Graph from './Graph';
import Fix from './Fix';

type PropsType = {
  graphData: ResponseAIType;
  recommendData: ResponseAIFixType;
  reset: () => void;
};

const Result = (props: PropsType): ReactElement => {
  const { t } = useTranslation();
  const { graphData, recommendData } = props;

  const handleRewriteButton = () => {
    props.reset();
  };

  return (
    <ResultContainer>
      <Diff origin={graphData.original} input={graphData.checked} />
      <Button onClick={handleRewriteButton}>{t('ai_button_rewrite')}</Button>

      <Graph data={graphData} />
      <Fix data={recommendData} />
    </ResultContainer>
  );
};

const ResultContainer = styled.div`
  width: 85%;
  max-width: 1200px;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 100px;
`;

const Button = styled.button`
  width: 20%;
  height: 65px;
  margin: 50px 0 100px 0;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  font-size: 20px;
  font-weight: bold;
  border-radius: 10px;
  cursor: pointer;
`;

export default Result;
