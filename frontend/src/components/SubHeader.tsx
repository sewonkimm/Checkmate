/* eslint-disable react/button-has-type */
import React, { ReactElement, useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { RootState } from '../modules';
import { MemberType } from '../entity';
import { logout } from '../modules/member';

const SubHeader = (): ReactElement => {
  const [member, setMember] = useState<MemberType | null>(useSelector((state: RootState) => state.member.member));
  const [isMember, setIsMember] = useState<boolean>(false);
  const [profileLink, setProfileLink] = useState<string>('');
  const dispatch = useDispatch();
  const router = useHistory();

  useEffect(() => {
    if (member === null) {
      setIsMember(false);
    } else if (member.memberId > 0) {
      setIsMember(true);
      setProfileLink(`/profile/${member.memberId}`);
    }
  }, [member]);

  // 로그아웃 액션 호출
  const onClickLogoutBtn = () => {
    dispatch(logout());
    setMember(null);
    router.push('/');
  };

  // 언어 변경
  const { i18n } = useTranslation();
  const handleChangeLanguage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    i18n.changeLanguage(e.target.value);
  };

  return (
    <SubHeaderContainer>
      <Select onChange={handleChangeLanguage}>
        <option value="ko">한국어</option>
        <option value="en">English</option>
        <option value="cn">中文</option>
      </Select>

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
  align-items: center;
  padding: 16px 20px;
  background-color: ${({ theme }) => theme.colors.primary};
`;

const Select = styled.select`
  width: 100px;
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.fontSizes.body};
  font-weight: normal;
  border: none;
  background-color: transparent;
  outline: none;
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
