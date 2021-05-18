import React, { ReactElement } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { MemberType } from '../../../entity/index';

type PropsType = {
  memberInfo: MemberType;
};

const FillupPoint = (props: PropsType): ReactElement => {
  const { t } = useTranslation();
  const { memberInfo } = props;

  // 포인트 3자리수 마다 ' , ' 넣는 함수
  function numberWithCommas(point: number) {
    return point.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  return (
    <PointWrap>
      <Point>
        {t('point')}: {numberWithCommas(memberInfo.memberPoint)}
      </Point>
      <ChargeWrap>
        <ChargeText>{t('charge')}</ChargeText>
        <ChargeBtn5>+ 5,000</ChargeBtn5>
        <ChargeBtn10>+ 10,000</ChargeBtn10>
      </ChargeWrap>
    </PointWrap>
  );
};

const PointWrap = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1.5em;
`;

const Point = styled.div`
  font-weight: 700;
  font-size: 30px;
  width: 230px;
`;
const ChargeWrap = styled.div`
  display: flex;
  align-items: center;
`;
const ChargeText = styled.h3`
  display: block;
  font-size: 25px;
  font-weight: 700;
  line-height: 50px;
  margin: 0;
  margin-right: 1em;
`;
const ChargeBtn5 = styled.button`
  width: 122px;
  height: 50px;
  border: 3px solid ${({ theme }) => theme.colors.secondary};
  border-radius: 5px;
  margin-right: 1em;
  background-color: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.white};
  font-size: 18px;
  font-weight: 700;
`;
const ChargeBtn10 = styled.button`
  width: 122px;
  height: 50px;
  border: 3px solid ${({ theme }) => theme.colors.primary};
  border-radius: 5px;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  font-size: 18px;
  font-weight: 700;
`;

export default FillupPoint;
