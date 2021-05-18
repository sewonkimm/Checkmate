/*
AI/components/Graph.tsx
: AI 첨삭 페이지 분석 결과 - 그래프 컴포넌트
*/

import React, { ReactElement, useState, useEffect } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { Doughnut } from 'react-chartjs-2';
import { ResponseAIType } from '../../../entity';

type PropsType = {
  data: ResponseAIType;
};

const Graph = (props: PropsType): ReactElement => {
  const { t } = useTranslation();
  const { data } = props;

  const [showGraph, setShowGraph] = useState(false);

  useEffect(() => {
    if (data.errors > 0) setShowGraph(true);
  }, [data]);

  const chartData = {
    labels: [t('ai_wrong_spelling'), t('ai_wrong_spacing'), t('ai_ambiguous'), t('ai_statistic')],
    datasets: [
      {
        label: t('ai_title_result'),
        data: [data.wrongSpelling, data.wrongSpacing, data.ambiguous, data.statisticalCorrection],
        backgroundColor: ['rgb(226, 82, 41)', 'rgb(120, 224, 78)', 'rgb(246, 222, 77)', 'rgb(77, 140, 244)'],
        hoverOffset: 4,
      },
    ],
  };
  const options = {
    plugins: {
      legend: {
        display: false,
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <Container>
      <Title>{t('ai_title_result')}</Title>
      <Divider />

      {showGraph ? (
        <GraphContainer>
          <Chart>
            <Doughnut type="doughnut" data={chartData} options={options} />
          </Chart>
          <ResultContainer>
            <P>
              {t('ai_result_title_word')} : {data.errorRate}%{' '}
              <Span>
                ({data.errors} / {data.total} {t('word')})
              </Span>
            </P>
            <ResultElement>
              <Label color="#E25229" />
              {t('ai_wrong_spelling')} : {data.wrongSpelling}
            </ResultElement>
            <ResultElement>
              <Label color="#78E04E" />
              {t('ai_wrong_spacing')} : {data.wrongSpacing}
            </ResultElement>
            <ResultElement>
              <Label color="#F6DE4D" />
              {t('ai_ambiguous')} : {data.ambiguous}
            </ResultElement>
            <ResultElement>
              <Label color="#4D8CF4" />
              {t('ai_statistic')} : {data.statisticalCorrection}
            </ResultElement>
          </ResultContainer>
        </GraphContainer>
      ) : (
        <>{t('ai_msg_perfect')}</>
      )}
    </Container>
  );
};

const Container = styled.h1`
  width: 100%;
  margin: 0 0 110px 0;
  display: flex;
  flex-direction: column;
  justify-content: felx-start;
`;

const Title = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes.h2};
  margin-bottom: 30px;
`;
const Divider = styled.div`
  width: 45%;
  height: 2px;
  margin-bottom: 80px;
  background-color: ${({ theme }) => theme.colors.black};
`;

const GraphContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: strecth;
`;
const Chart = styled.div`
  width: 100%;
`;

const ResultContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;
  margin: 0;
`;
const P = styled.p`
  margin-top: 0;
  margin-bottom: 20px;
`;
const Span = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.body};
  font-weight: normal;
`;
const ResultElement = styled.p`
  margin: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: ${({ theme }) => theme.fontSizes.title};
  font-weight: normal;
`;
const Label = styled.div`
  background-color: ${(props) => props.color};
  border-radius: 50%;
  width: 20px;
  height: 20px;
  margin-right: 14px;
`;

export default Graph;
