import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const SubHeader = (): ReactElement => {
  return (
    <SubHeaderContainer>
      {/* 언어 선택 버튼 추가 */}
      <StyledLink to="/login">로그인</StyledLink>
      <StyledLink to="/register">회원가입</StyledLink>
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

export default SubHeader;
