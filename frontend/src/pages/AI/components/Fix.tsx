/*
AI/components/Fix.tsx
: AI 첨삭 페이지 분석 결과 - 추천 교정 컴포넌트
*/

import React, { ReactElement, useState, useEffect } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { ResponseAIFixType } from '../../../entity';

type PropsType = {
  data: ResponseAIFixType;
};

const Fix = (props: PropsType): ReactElement => {
  const { t } = useTranslation();
  const { data } = props;

  const [showRecommend, setShowRecommend] = useState(false);

  useEffect(() => {
    let flag = false;
    if (data[1].length > 0) flag = true;
    else if (data[2].length > 0) flag = true;
    else if (data[3].length > 0) flag = true;
    else if (data[4].length > 0) flag = true;
    else if (data[5].length > 0) flag = true;
    else if (data[6].length > 0) flag = true;
    else if (data[7].length > 0) flag = true;

    setShowRecommend(flag);
  }, [data]);

  return (
    <Container>
      <Title>{t('ai_result_title_recommend')}</Title>
      <Divider />
      {showRecommend ? (
        <FixContainer>
          {data[1].length > 0 && (
            <>
              <FixTitle>{t('ai_msg_warning_science')}</FixTitle>
              <FixBox>
                {data[1].map((value) => {
                  return (
                    <p>
                      {value[0]} 👉 {value[1]}
                    </p>
                  );
                })}
              </FixBox>
            </>
          )}
          {data[2].length > 0 && (
            <>
              <FixTitle>{t('ai_msg_warning_passive')}</FixTitle>
              <FixBox>
                {data[2].map((value) => {
                  return (
                    <p>
                      {value[0]} 👉 {value[1]}
                    </p>
                  );
                })}
              </FixBox>
            </>
          )}
          {data[3].length > 0 && (
            <>
              <FixTitle>{t('ai_msg_warning_hard')}</FixTitle>
              <FixBox>
                {data[3].map((value) => {
                  return (
                    <p>
                      {value[0]} 👉 {value[1]}
                    </p>
                  );
                })}
              </FixBox>
            </>
          )}
          {data[4].length > 0 && (
            <>
              <FixTitle>{t('ai_msg_warning_long')}</FixTitle>
              <FixBox>
                {data[4].map((value) => {
                  return (
                    <p>
                      {value[0]} 👉 {value[1]}
                    </p>
                  );
                })}
              </FixBox>
            </>
          )}
          {data[5].length > 0 && (
            <>
              <FixTitle>{t('ai_msg_warning_japan')}</FixTitle>
              <FixBox>
                {data[5].map((value) => {
                  return (
                    <p>
                      {value[0]} 👉 {value[1]}
                    </p>
                  );
                })}
              </FixBox>
            </>
          )}
          {data[6].length > 0 && (
            <>
              <FixTitle>{t('ai_msg_warning_english')}</FixTitle>
              <FixBox>
                {data[6].map((value) => {
                  return (
                    <p>
                      {value[0]} 👉 {value[1]}
                    </p>
                  );
                })}
              </FixBox>
            </>
          )}
          {data[7].length > 0 && (
            <>
              <FixTitle>{t('ai_msg_warning_chinese')}</FixTitle>
              <FixBox>
                {data[7].map((value) => {
                  return (
                    <p>
                      {value[0]} 👉 {value[1]}
                    </p>
                  );
                })}
              </FixBox>
            </>
          )}
        </FixContainer>
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
  margin-bottom: 50px;
  background-color: ${({ theme }) => theme.colors.black};
`;

const FixContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;
const FixTitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes.title};
  font-weight: bold;
`;
const FixBox = styled.div`
  width: 100%;
  margin-bottom: 30px;
  padding: 15px 25px;
  background-color: ${({ theme }) => theme.colors.white};
  border: 2px solid ${({ theme }) => theme.colors.whiteD9};
  border-radius: 15px;
  font-size: ${({ theme }) => theme.fontSizes.body};
  font-weight: normal;

  p {
    margin: 5px 0;
  }
`;

export default Fix;
// 나는 헌법론과의 법론학적으로 한국인이 되고 있는 것 같다.
