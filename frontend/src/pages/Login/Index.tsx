/* eslint-disable camelcase */
/*
Login/index.tsx
: 로그인 페이지
*/

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTranslation } from 'react-i18next';
import jwt_decode from 'jwt-decode';
import { login } from '../../modules/member';
import { signupIconNormal } from '../../assets';
import LoginAPI from '../../api/login';
import { LoginReturnType } from '../../entity';

const Login: React.FC = () => {
  const { t } = useTranslation();
  const router = useHistory();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const dispatch = useDispatch();

  // input event 핸들러
  const onChangeEmailInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setEmail(e.target.value);
  };

  const onChangePasswordInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setPassword(e.target.value);
  };

  // login api enter 키로 호출
  const handleKeydownLogin = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleLoginBtn();
    }
  };

  // Login api 호출 (click으로 호출)
  const handleLoginBtn = async () => {
    const data = {
      memberEmail: email,
      memberPassword: password,
    };

    const response = await LoginAPI(data);

    if (response.message === 'error') {
      // 에러 처리(추가)
      // 비밀번호랑 아이디가 정확하지 않으면 catch로 바로 빠지는데?
      toast.error('아이디 혹은 비밀번호가 일치하지 않습니다 😣', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      const member: LoginReturnType = jwt_decode(response.accesstoken);
      dispatch(login(member.member));
      router.push('/');
    }
  };

  return (
    <LoginContainer>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Title>Login</Title>
      <Icon src={signupIconNormal} alt="logo" />

      <Form>
        <Input value={email} onChange={onChangeEmailInput} type="text" placeholder="ID" />
        <Input
          value={password}
          onChange={onChangePasswordInput}
          placeholder="Password"
          type="password"
          onKeyPress={handleKeydownLogin}
        />
      </Form>
      <LoginBtn onClick={handleLoginBtn}>{t('login')}</LoginBtn>
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
  font-weight: normal;
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
  cursor: pointer;
`;
export default Login;
