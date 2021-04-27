import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { logo } from '../assets';

const Header = (): ReactElement => {
  return (
    <HeaderContainer>
      <img src={logo} alt="logo" width="70" />
      <LinkContainer>
        <StyledLink to="/Store">스토어</StyledLink>
        <StyledLink to="/Check/ai">AI첨삭</StyledLink>
        <StyledLink to="/Check/mate">원어민첨삭</StyledLink>
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
