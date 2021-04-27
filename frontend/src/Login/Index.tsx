/*
Login/index.tsx
: 로그인 페이지
*/

import React from 'react';
import styled from 'styled-components';
import { signupIconNormal } from '../assets';

const Login: React.FC = () => {
  return (
    <LoginContainer>
      <Title>Login</Title>
      <Icon src={signupIconNormal} alt="logo" />
    </LoginContainer>
  );
};

// Login page style
const LoginContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
`;

const Title = styled.h1`
  margin: 0 0 20px 0;
  font-family: 'Kirang Haerang', cursive;
  font-size: 72px;
`;
const Icon = styled.img`
  width: 218px;
`;

export default Login;
