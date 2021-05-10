import React, { ReactElement } from 'react';
import styled from 'styled-components';
import { MemberType } from '../../../entity/index';

type PropsType = {
  memberInfo: MemberType;
};

const MyInfo = (props: PropsType): ReactElement => {
  const { memberInfo } = props;

  return (
    <InfoWrap>
      <InfoLeft>
        <Name>{memberInfo.memberNickname}</Name>
        <LeftDescription>별별별별별 120개의 평가</LeftDescription>
      </InfoLeft>
      <InfoRight>
        <Name>소개</Name>
        <RightDescription>{memberInfo.memberIntroduce}</RightDescription>
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
