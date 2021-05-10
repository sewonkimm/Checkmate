import React, { ReactElement } from 'react';
import styled from 'styled-components';
import { MemberType } from '../../../entity/index';

type PropsType = {
  memberInfo: MemberType;
};

const FillupPoint = (props: PropsType): ReactElement => {
  const { memberInfo } = props;

  return (
    <PointWrap>
      <Point>Point: {memberInfo.memberPoint}</Point>
      <ChargeWrap>
        <ChargeText>충전하기</ChargeText>
        <ChargeBtn5>+ 5,000</ChargeBtn5>
        <ChargeBtn10>+ 10,000</ChargeBtn10>
      </ChargeWrap>
    </PointWrap>
  );
};

const PointWrap = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 0.5em;
`;

const Point = styled.div`
  font-weight: 700;
  font-size: 31px;
  margin: 15px 0;
  width: 200px;
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
  border: 3px solid #038efc;
  border-radius: 5px;
  margin-right: 1em;
  background-color: #038efc;
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
