import React, { ReactElement } from 'react';
import styled from 'styled-components';
import SubHeader from '../../components/SubHeader';
import Header from '../../components/Header';
import MyInfo from './components/MyInfo';
import MyAvatar from './components/MyAvatar';
import FillupPoint from './components/FillupPoint';

const Index = (): ReactElement => {
  const updateMyInfo = () => {
    console.log(`clicked btn`);
  };
  return (
    <>
      <SubHeader />
      <Header />

      <MyPageWrap>
        {/* 유저 정보 섹션 */}
        <MyInfoWrap>
          <MyAvatar />
          <MyInfo />
        </MyInfoWrap>
        <MyInfoEditBtn onClick={updateMyInfo}>수 정</MyInfoEditBtn>
        {/* 충전 포인트 관련 섹션 */}
        <FillupPoint />
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
