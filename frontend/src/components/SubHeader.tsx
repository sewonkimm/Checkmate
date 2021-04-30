import React, { ReactElement, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { RootState } from '../modules';
import { MemberType } from '../entity';

const SubHeader = (): ReactElement => {
  const [member, setMember] = useState<MemberType>(useSelector((state: RootState) => state.member.member));
  const [isMember, setIsMember] = useState<boolean>(false);
  const [profileLink, setProfileLink] = useState<string>('');

  useEffect(() => {
    if (member.memberId > 0) {
      setIsMember(true);
      setProfileLink(`/profile/${member.memberId}`);
    }
  }, [member]);

  // 로그아웃 액션 호출
  const onClickLogoutBtn = () => {
    console.log('logout');
  };

  return (
    <SubHeaderContainer>
      {/* 언어 선택 버튼 추가 */}

      {isMember ? (
        <>
          <StyledLink to={profileLink}>마이페이지</StyledLink>
          <LogoutBtn onClick={onClickLogoutBtn}>로그아웃</LogoutBtn>
        </>
      ) : (
        <>
          <StyledLink to="/login">로그인</StyledLink>
          <StyledLink to="/register">회원가입</StyledLink>
        </>
      )}
    </SubHeaderContainer>
  );
};

// SubHeader style
const SubHeaderContainer = styled.div`
  width: 100%;
  height: 58px;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  padding: 16px 20px;
  background-color: ${({ theme }) => theme.colors.primary};
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  margin-left: 30px;
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.fontSizes.body};
  font-weight: normal;
  cursor: pointer;
`;

const LogoutBtn = styled.a`
  text-decoration: none;
  margin-left: 30px;
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.fontSizes.body};
  font-weight: normal;
  cursor: pointer;
`;

export default SubHeader;
