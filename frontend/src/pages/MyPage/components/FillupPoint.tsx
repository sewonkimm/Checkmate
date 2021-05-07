import React from 'react';
import styled from 'styled-components';

const FillupPoint = () => {
  return (
    <>
      <Point>Point: 500</Point>
      <ChargeWrap>
        <ChargeText>충전하기</ChargeText>
        <ChargeBtn5>+ 5,000</ChargeBtn5>
        <ChargeBtn10>+ 10,000</ChargeBtn10>
      </ChargeWrap>
    </>
  );
};

const Point = styled.h2`
  font-weight: 700;
  font-size: 31px;
  margin: 15px 0;
`;
const ChargeWrap = styled.div`
  width: 100%;
  display: flex;
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
  margin-right: 1em;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  font-size: 18px;
  font-weight: 700;
`;

export default FillupPoint;
