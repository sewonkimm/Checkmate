import React, { ReactElement, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { RootState } from '../../modules';
import { getMemberInfo, getMemberReview, getAvgReview } from '../../api/member';
import SubHeader from '../../components/SubHeader';
import Header from '../../components/Header';
import MyInfo from './components/MyInfo';
import MyAvatar from './components/MyAvatar';
import FillupPoint from './components/FillupPoint';
import { MemberType, ReviewType } from '../../entity/index';
import MyQuestions from './components/MyQuestions';
import MyReview from './components/MyReview';

const Index = (): ReactElement => {
  const userId: number = useSelector((state: RootState) => state.member).member.memberId;
  const [myInfo, setMyInfo] = useState<MemberType>({
    memberEmail: '',
    memberId: 0,
    memberIntroduce: '',
    memberNativeLang: '',
    memberNickname: '',
    memberPoint: 0,
    memberProfileUrl: '',
    memberTypeId: 0,
  });
  const [offset, setOffset] = useState<number>(0);
  const [reviewTotalSize, setReviewTotalSize] = useState<number>(0);
  const [myReview, setMyReview] = useState<ReviewType[]>([]);
  const [getMoreReviewStatus, setGetMoreReviewStatus] = useState<boolean>(true);
  const [reviewLimit, setReviewLimit] = useState<number>(6);
  const [reviewScore, setReviewScore] = useState<number>(0);
  // 사용자 기본 정보 조회
  useEffect(() => {
    const fetchMemberInfo = async () => {
      const response = await getMemberInfo(`members/${userId}`);
      if (response === null) {
        alert('정보 조회 실패');
      } else {
        setMyInfo(response);
      }
    };
    fetchMemberInfo();
  }, [userId]);

  const MySwal = withReactContent(Swal);
  // 사용자가 받은 리뷰 조회
  useEffect(() => {
    const fetchMemberReview = async () => {
      const response = await getMemberReview(`members/reviews/${userId}/${offset}/${reviewLimit}`);
      if (response !== null) {
        const memberReview = myReview.concat(response.reviewList);
        setMyReview(memberReview);
        const reviewTotalSize = response.totalSize;
        setReviewTotalSize(reviewTotalSize);
      } else {
        MySwal.fire({
          text: '받은 리뷰 조회 실패',
          icon: 'error',
          cancelButtonText: '취소',
          showCancelButton: true,
        });
      }
    };
    const fetchMyReviewScore = async () => {
      const res = await getAvgReview(`members/${userId}`);
      if (res !== null) {
        const avgScore = res;
        setReviewScore(avgScore);
      } else {
        MySwal.fire({
          text: '리뷰 평점 조회 실패',
          icon: 'error',
          cancelButtonText: '취소',
          showCancelButton: true,
        });
      }
    };
    fetchMemberReview();
    fetchMyReviewScore();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [offset]);

  // 회원 정보 변경
  const updateMyInfo = () => {
    console.log(`clicked btn`);
  };
  // 후기 더보기 버튼
  const getMoreReviews = () => {
    if (reviewTotalSize > offset) {
      setGetMoreReviewStatus(true);
      setOffset(offset + 6);
      setGetMoreReviewStatus(false);
    }
  };

  return (
    <>
      <SubHeader />
      <Header />

      <MyPageWrap>
        {/* 유저 정보 섹션 */}
        <MyInfoWrap>
          <MyAvatar />
          <MyInfo memberInfo={myInfo} totalReview={reviewTotalSize} avgReviewScore={reviewScore} />
        </MyInfoWrap>
        {/* 충전 포인트 관련 섹션 */}
        <FillupPoint memberInfo={myInfo} />
        <MyInfoEditBtn onClick={updateMyInfo}>수 정</MyInfoEditBtn>
        <MyQuestions />
        <MyReview
          avgScore={reviewScore}
          reviews={myReview}
          totalReviews={reviewTotalSize}
          getMoreReviewFunc={getMoreReviews}
          getMoreStatus={getMoreReviewStatus}
        />
      </MyPageWrap>
    </>
  );
};

const MyPageWrap = styled.section`
  width: 80vw;
  max-width: 1200px;
  margin: auto;
  margin-top: 2em;
`;
const MyInfoWrap = styled.section`
  width: 100%;
  display: flex;
`;
const MyInfoEditBtn = styled.button`
  margin-top: 2em;
  width: 100%;
  height: 50px;
  border: 3px solid ${({ theme }) => theme.colors.primary};
  border-radius: 5px;
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 700;
  &: hover {
    cursor: pointer;
  }
`;

export default Index;
