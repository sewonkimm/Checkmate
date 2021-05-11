/*
AI/components/Result.tsx
: AI 첨삭 페이지 분석 결과 컴포넌트
*/

import React, { ReactElement } from 'react';
import styled from 'styled-components';
import Diff from '../../../components/Diff';
import { ResponseAIType } from '../../../entity';

type PropsType = {
  data: ResponseAIType;
  reset: () => void;
};

const Result = (props: PropsType): ReactElement => {
  const { data } = props;

  const handleRewriteButton = () => {
    props.reset();
  };

  return (
    <ResultContainer>
      <Diff origin={data.original} input={data.checked} />
      <Button onClick={handleRewriteButton}>다시쓰기</Button>
    </ResultContainer>
  );
};

const ResultContainer = styled.div`
  width: 85%;
  max-width: 985px;
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
