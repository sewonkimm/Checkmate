import React from 'react';
import styled from 'styled-components';

const MyInfo = () => {
  return (
    <InfoWrap>
      <InfoLeft>
        <Name>Tomas Lee</Name>
        <LeftDescription>싸피대학교/ 문예창작학과</LeftDescription>
        <LeftDescription>평균 응답시간 30분 이내</LeftDescription>
        <LeftDescription>별별별별별 120개의 평가</LeftDescription>
      </InfoLeft>
      <InfoRight>
        <Name>소개</Name>
        <RightDescription>15살에 캐나다 이민을 가고 ~줄안되면 내리는 css필요</RightDescription>
      </InfoRight>
    </InfoWrap>
  );
};

const InfoWrap = styled.div`
  width: 100%;
  display: flex;
`;
const InfoLeft = styled.div`
  flex-basis: 45%;
`;
const InfoRight = styled.div`
  flex-basis: 55%;
`;
const Name = styled.h3`
  margin: 0.5em 0;
  font-size: 25px;
  font-weight: 700;
`;
const LeftDescription = styled.p`
  font-size: 14px;
  margin: 0.5em 0;
`;

const RightDescription = styled.p`
  font-size: 14px;
  margin: 0.5em 0;
`;

export default MyInfo;
