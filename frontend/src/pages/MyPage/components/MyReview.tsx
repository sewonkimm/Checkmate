import React, { ReactElement } from 'react';
import styled from 'styled-components';
import Rating from 'react-rating';
import { ReviewType } from '../../../entity/index';
import { star, starEmpty } from '../../../assets';

type PropsType = {
  reviews: ReviewType[];
  totalReviews: number;
  getMoreReviewFunc: () => void;
  getMoreStatus: boolean;
};

const MyReview = (props: PropsType): ReactElement => {
  const { totalReviews, reviews, getMoreStatus } = props;

  // 내려받은 함수 실행
  const handleGetMoreBtn = () => {
    props.getMoreReviewFunc();
  };

  return (
    <ReviewWrap>
      <ReviewHeader>
        <HeaderTitle>Review</HeaderTitle>
        <TotalRates>
          <TotalStars>별별별</TotalStars>
          <TotalReviewNum>{totalReviews}개의 평가</TotalReviewNum>
        </TotalRates>
      </ReviewHeader>
      <Description>서비스 사용자들이 남긴 후기입니다.</Description>
      <ReviewCards>
        {reviews.length > 0 ? (
          reviews.map((item) => {
            return (
              <ReviewCard>
                <SingleStar>
                  <Rating
                    initialRating={item.reviewScore}
                    readonly
                    emptySymbol={<img src={starEmpty} className="icon" alt="starEmpty" />}
                    fullSymbol={<img src={star} className="icon" alt="star" />}
                  />
                </SingleStar>
                <SingleReview>{item.reviewContents}</SingleReview>
              </ReviewCard>
            );
          })
        ) : (
          <NoReviewMsg>받으신 리뷰가 없습니다😅</NoReviewMsg>
        )}
      </ReviewCards>
      {getMoreStatus ? (
        <GetMoreReviewBtn onClick={handleGetMoreBtn}>후기 더 보기</GetMoreReviewBtn>
      ) : (
        <NoGetMoreReviewBtn onClick={handleGetMoreBtn}>후기 더 보기</NoGetMoreReviewBtn>
      )}
    </ReviewWrap>
  );
};

const ReviewWrap = styled.div`
  width: 100%;
  margin-top: 52px;
`;
const ReviewHeader = styled.div``;
const HeaderTitle = styled.h3`
  font-size: 36px;
  font-weight: 700;
  margin: 0 0 10px 0;
`;
const TotalRates = styled.div`
  display: flex;
`;
const TotalStars = styled.div``;
const TotalReviewNum = styled.div``;
const Description = styled.div`
  width: 48%;
  border-bottom: 2px solid grey;
  padding: 15px 0 10px 0;
  font-size: 18px;
  font-weight: 400;
  margin-bottom: 10px;
`;
const ReviewCards = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 10px 0;
`;
const ReviewCard = styled.div`
  padding: 30px;
  font-size: 18px;
  font-weight: 400;
  flex-basis: 48%;
  box-shadow: 0px 0px 40px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  margin: 15px 0;
`;
const SingleStar = styled.div``;
const SingleReview = styled.p``;
const NoReviewMsg = styled.h3`
  text-align: center;
`;
const GetMoreReviewBtn = styled.button`
  width: 100%;
  background: #038efc;
  border-radius: 5px;
  color: ${({ theme }) => theme.colors.white};
  font-size: 18px;
  font-weight: 700;
  padding: 12px;
  margin-bottom: 2em;
  &: hover {
    cursor: pointer;
  }
`;
const NoGetMoreReviewBtn = styled.button`
  width: 100%;
  background: #038efc;
  border-radius: 5px;
  color: ${({ theme }) => theme.colors.white};
  font-size: 18px;
  font-weight: 700;
  padding: 12px;
  margin-bottom: 2em;
  opacity: 0.5;
`;

export default MyReview;
