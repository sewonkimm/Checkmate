import React, { ReactElement } from 'react';
import styled from 'styled-components';
import Rating from 'react-rating';
import { star, starEmpty } from '../../../assets';
import { MemberType } from '../../../entity/index';

type PropsType = {
  memberInfo: MemberType;
  totalReview: number;
};

const MyInfo = (props: PropsType): ReactElement => {
  const { memberInfo, totalReview } = props;

  return (
    <InfoWrap>
      <InfoLeft>
        <Name>{memberInfo.memberNickname}</Name>
        <LeftDescription>
          <Rating
            initialRating={4}
            readonly
            emptySymbol={<img src={starEmpty} className="icon" alt="starEmpty" />}
            fullSymbol={<img src={star} className="icon" alt="star" />}
          />
          <Reviews>{totalReview}개의 평가</Reviews>
        </LeftDescription>
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
const Reviews = styled.span`
  margin-left: 1em;
  font-size: 18px;
`;

const RightDescription = styled.p`
  font-size: 14px;
  margin: 0.5em 0;
`;

export default MyInfo;
