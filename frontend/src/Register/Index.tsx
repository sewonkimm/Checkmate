/*
Register/Index.tsx
: 회원가입 페이지
*/

import React, { useState } from 'react';
import styled from 'styled-components';
import {signupIconNormal} from '../assets'
import MotherLanguage from './components/MotherLanguage';
import InputEmail from './components/InputEmail';
import Nickname from './components/Nickname';
import RegisterComplete from './components/RegisterComplete';
import InputPassword from './components/InputPassword';



const Register: React.FC = () => {
  const [step, setStep] = useState<number>(0); // 몇 번째 컴포넌트가 보여질지 정해주는 state
  const [selectedLanguage, setSelectedLanguage] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [nickname, setNickname] = useState<string>('');

  const handleNextBtn = () => {
    if (step >= 0 && step < registerGroup.length - 1) {
      setStep(step + 1); // 다음 컴포넌트로
    }
    if (step === 4 && email && password && nickname) {
      // axios 회원가입 요청
    } else {
      // 경고 문구 후 step[0]으로 보내버리기 혹은 해당 항목으로 보내버릴까
    }
    if (step === 5) {
      // 로그인쪽으로 보낸다. 혹은 메인으로
    }
  };

  const handlePrevBtn = () => {
    if (step > 0 && step < registerGroup.length) {
      setStep(step - 1); // 이전 컴포넌트로
    }
  };

  const putLang = (language: string) => {
    // 선택한 언어로 language 값을 바꿈
    setSelectedLanguage(language);
  };
  const putEmail = (emailValue: string) => {
    setEmail(emailValue);
  };
  const putPassword = (passwordValue: string) => {
    setPassword(passwordValue);
  };
  const putNickname = (name: string) => {
    setNickname(name);
  };

  const registerGroup: Array<JSX.Element> = [
    <MotherLanguage putLang={putLang} />,
    <InputEmail putEmail={putEmail} />,
    <InputPassword putPassword={putPassword} />,
    <Nickname putNickname={putNickname} />,
    <RegisterComplete />,
  ];

  return (
    <RegisterWrap>
      <Logo>
        <Title>Sign-Up</Title>
        <Icon src={signupIconNormal} alt="signup-logo" />
      </Logo>
      <SignupBody>
        <Steps>
          {step + 1} / {registerGroup.length} {selectedLanguage} {email} {password} {nickname}
        </Steps>
        {registerGroup[step]}
      </SignupBody>
      <ButtonWrap>
        {step > 0 && <NextBtn onClick={handlePrevBtn}>이전으로</NextBtn>}
        <NextBtn onClick={handleNextBtn}>다음으로</NextBtn>
      </ButtonWrap>
    </RegisterWrap>
  );
};

const RegisterWrap = styled.section`
  width: 100%;
  height: 100vh;
  display: flex;
  // padding: 200px 0;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
`;
const Logo = styled.section``;
const Title = styled.h1`
  margin: 0 0 20px 0;
  font-family: 'Kirang Haerang', cursive;
  font-size: 72px;
  font-weight: normal;
`;
const Icon = styled.img`
  width: 14.875rem;
  height: auto;
`;
const SignupBody = styled.section`
  margin-top: 60px;
  margin-bottom: 70px;
  width: 473px;
`;

const Steps = styled.p`
  font-size: 24px;
`;
const ButtonWrap = styled.div`
  width: 473px;
  display: flex;
  justify-content: space-around;
`;

const NextBtn = styled.button`
  font-size: 20px;
  width: 230px;
  height: 65px;
  border-radius: 10px;
  font-weight: 900;
  color: #0F16F8;
  background-color: ${({ theme }) => theme.colors.white};
  &:hover{
    cursor: pointer;
  }
`;


export default Register;
