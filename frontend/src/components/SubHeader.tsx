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
  const dispatch = useDispatch();
  const router = useHistory();
  const { t, i18n } = useTranslation();

  const isLogin = useSelector((state: RootState) => state.member.isLogin);
  const [member] = useState<MemberType>(useSelector((state: RootState) => state.member.member));
  const [profileLink, setProfileLink] = useState<string>('');
  const [lang, setLang] = useState<string>(i18n.languages[0]);

  useEffect(() => {
    if (isLogin) {
      setProfileLink(`/profile/${member.memberId}`);
    }
  }, [isLogin, member]);

  // 로그아웃 액션 호출
  const onClickLogoutBtn = () => {
    dispatch(logout());
    router.push('/');
  };

  // 언어 변경 함수
  const handleChangeLanguage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const lang = e.target.value;
    i18n.changeLanguage(lang);
    setLang(lang);
    localStorage.setItem('language', lang);
  };

  return (
    <SubHeaderContainer>
      <Select value={lang} onChange={handleChangeLanguage}>
        <SelectOption value="DEFAULT" disabled>
          {t('language')}
        </SelectOption>
        <SelectOption value="ko">한국어</SelectOption>
        <SelectOption value="en">English</SelectOption>
        <SelectOption value="zh">中文(简体)</SelectOption>
      </Select>

      {isLogin ? (
        <>
          <StyledLink to={profileLink}>{t('mypage')}</StyledLink>
          <LogoutBtn onClick={onClickLogoutBtn}>{t('logout')}</LogoutBtn>
        </>
      ) : (
        <>
          <StyledLink to="/login">{t('login')}</StyledLink>
          <StyledLink to="/register">{t('register')}</StyledLink>
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
  padding: 16px 48px;
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

const SelectOption = styled.option`
  color: ${({ theme }) => theme.colors.black};
  font-size: 22px;
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
