/*
Login/index.tsx
: 로그인 페이지
*/

import React, { useState } from 'react';
import styled from 'styled-components';
import { signupIconNormal } from '../assets';

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  // input event 핸들러
  const onChangeEmailInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setEmail(e.target.value);
  };

  const onChangePasswordInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setPassword(e.target.value);
  };

  // Login api 호출
  const handleLoginBtn = () => {
    // 로그인
  };

  return (
    <LoginContainer>
      <Title>Login</Title>
      <Icon src={signupIconNormal} alt="logo" />

      <Form>
        <Input value={email} onChange={onChangeEmailInput} type="text" placeholder="ID" />
        <Input value={password} onChange={onChangePasswordInput} placeholder="Password" type="password" />
      </Form>

      <LoginBtn onClick={handleLoginBtn}>Login</LoginBtn>
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

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 70px;
`;
const Input = styled.input`
  width: 386px;
  height: 65px;
  padding: 25px 18px;
  background-color: ${({ theme }) => theme.colors.white};
  border: 3px solid ${({ theme }) => theme.colors.secondary};
  border-radius: 8px;
  font-size: ${({ theme }) => theme.fontSizes.body};
  font-weight: bold;

  &:: placeholder {
    color: ${({ theme }) => theme.colors.secondary};
    font-weight: normal;
  }

  &: focus {
    outline: none;
  }
`;

const LoginBtn = styled.button`
  width: 386px;
  height: 65px;
  margin-top: 50px;
  color: ${({ theme }) => theme.colors.white};
  background-color: ${({ theme }) => theme.colors.secondary};
  border-radius: 8px;
  font-size: 20px;
  font-weight: bold;
`;
export default Login;
