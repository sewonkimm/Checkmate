import React, { ReactElement } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import Rating from 'react-rating';
import { star, starEmpty } from '../../../assets';
import { MemberType } from '../../../entity/index';

type PropsType = {
  memberInfo: MemberType;
  totalReview: number;
  avgReviewScore: number;
};

const MyInfo = (props: PropsType): ReactElement => {
  const { t } = useTranslation();
  const { memberInfo, totalReview, avgReviewScore } = props;

  return (
    <InfoWrap>
      <InfoLeft>
        <Name>{memberInfo.memberNickname}</Name>
        <LeftDescription>
          <Rating
            initialRating={avgReviewScore}
            readonly
            emptySymbol={<img src={starEmpty} className="icon" alt="starEmpty" />}
            fullSymbol={<img src={star} className="icon" alt="star" />}
          />
          <Reviews>
            {totalReview}
            {t('my_count_review')}
          </Reviews>
        </LeftDescription>
      </InfoLeft>
      <InfoRight>
        <Name>{t('my_info')}</Name>
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
  font-weight: 600;
`;

const RightDescription = styled.p`
  font-size: 14px;
  margin: 0.5em 0;
`;

export default MyInfo;
