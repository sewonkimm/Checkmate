/*
Register/Index.tsx
: 회원가입 페이지
*/

import React, { useState } from 'react';
import styled from 'styled-components';
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
      <div>
        {step + 1} / {registerGroup.length} {email} {password} {nickname}
      </div>
      {selectedLanguage}
      {registerGroup[step]}
      <div>
        {step > 0 && <PrevBtn onClick={handlePrevBtn}>이전으로</PrevBtn>}
        <NextBtn onClick={handleNextBtn}>다음으로</NextBtn>
      </div>
    </RegisterWrap>
  );
};

const RegisterWrap = styled.div``;
const NextBtn = styled.button``;
const PrevBtn = styled.button``;
export default Register;
