/*
Register/Index.tsx
: 회원가입 페이지
*/

import React, { useState } from 'react';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import { signupIconNormal } from '../assets';
import MotherLanguage from './components/MotherLanguage';
import InputEmail from './components/InputEmail';
import InputNickname from './components/InputNickname';
import RegisterComplete from './components/RegisterComplete';
import InputPassword from './components/InputPassword';
import register from '../api/register';

const Register: React.FC = () => {
  const [step, setStep] = useState<number>(0); // 몇 번째 컴포넌트가 보여질지 정해주는 state
  const [selectedLanguage, setSelectedLanguage] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [nickname, setNickname] = useState<string>('');
  const history = useHistory();

  const handleNextBtn = async () => {
    if (step >= 0 && step < registerGroup.length - 1) {
      // 다음 컴포넌트 표시
      setStep(step + 1);

      // 조건을 다 만족하면 회원가입 api 호출
      if (step >= 3 && email && password && nickname) {
        // 회원가입 시 전달할 데이터
        const credentials = {
          memberEmail: email,
          memberId: 0,
          memberIntroduce: '',
          memberNativeLang: selectedLanguage,
          memberNickname: nickname,
          memberPassword: password,
          memberPoint: 0,
          memberProfileUrl: '',
          memberTypeId: 0,
        };

        // axios 회원가입 요청
        const response = await register.registerAPI(credentials);
        if (response === -1) {
          alert('회원가입에 실패했습니다.'); // 추후 토스트 메세지로 변경
          setStep(0);
        } else {
          setStep(step + 1);
        }
      } else if (step >= 3 && !(email && password && nickname)) {
        setStep(0);
      }
    }

    // 로그인 화면으로 분기
    if (step === 4) {
      history.push('/login');
    }
  };

  // 이전 컴포넌트 표시
  const handlePrevBtn = () => {
    if (step > 0 && step < registerGroup.length) {
      setStep(step - 1);
    }
  };

  const putLang = (language: string) => {
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

  // 단계별로 보여질 컴포넌트 배열
  const registerGroup: Array<JSX.Element> = [
    <MotherLanguage putLang={putLang} />,
    <InputEmail putEmail={putEmail} />,
    <InputPassword putPassword={putPassword} />,
    <InputNickname putNickname={putNickname} />,
    <RegisterComplete />,
  ];

  return (
    <RegisterWrap>
      <section>
        <Title>Sign-Up</Title>
        <Icon src={signupIconNormal} alt="signup-logo" />
      </section>

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

// Register page style
const RegisterWrap = styled.section`
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
  font-weight: normal;
`;
const Icon = styled.img`
  width: 14.875rem;
  height: auto;
`;

const SignupBody = styled.section`
  margin-top: 60px;
  margin-bottom: 20px;
  width: 473px;
`;
const Steps = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.title};
`;
const ButtonWrap = styled.div`
  width: 473px;
  display: flex;
  justify-content: center;
`;
const NextBtn = styled.button`
  font-size: 20px;
  width: 230px;
  height: 65px;
  border-radius: 10px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primary};
  background-color: ${({ theme }) => theme.colors.white};
  &:hover {
    cursor: pointer;
  }
`;

export default Register;
