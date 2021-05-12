import React, { ReactElement } from 'react';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { logo } from '../assets';

const Header = (): ReactElement => {
  const { t } = useTranslation();
  const router = useHistory();

  const handleLogoClick = () => {
    router.push('/');
  };

  return (
    <HeaderContainer>
      <Logo src={logo} alt="logo" onClick={handleLogoClick} width="70" />
      <LinkContainer>
        <StyledLink to="/check/ai">{t('ai')}</StyledLink>
        <StyledLink to="/check/mate">{t('mate')}</StyledLink>
      </LinkContainer>
    </HeaderContainer>
  );
};

// Header style
const HeaderContainer = styled.div`
  width: 100%;
  height: 116px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0 50px;
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: 0px 0px 20px -5px rgba(0, 0, 0, 0.5);
`;

const Logo = styled.img`
  width: 70px;
  cursor: pointer;
`;

const LinkContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  margin-left: 40px;
  color: ${({ theme }) => theme.colors.black};
  font-size: ${({ theme }) => theme.fontSizes.title};
  font-weight: bold;
  cursor: pointer;
`;

export default Header;
