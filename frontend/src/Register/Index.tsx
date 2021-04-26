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

const Register: React.FC = () => {
  const [step, setStep] = useState<number>(0); // 몇 번째 컴포넌트가 보여질지 정해주는 state
  const [selectedLanguage, setSelectedLanguage] = useState<string>('');

  const handleNextBtn = () => {
    if (step >= 0 && step < registerGroup.length - 1) {
      setStep(step + 1); // 다음 컴포넌트로
    }
  };
  const handlePrevBtn = () => {
    if (step > 0 && step < registerGroup.length) {
      setStep(step - 1); // 이전 컴포넌트로
    }
  };

  const setLang = (language: string) => {
    // 선택한 언어로 language 값을 바꿈
    setSelectedLanguage(language);
  };

  const registerGroup: Array<JSX.Element> = [
    <MotherLanguage setLang={setLang} />,
    <InputEmail />,
    <Nickname />,
    <RegisterComplete />,
  ];

  return (
    <RegisterWrap>
      <div>
        {step + 1} / {registerGroup.length}
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
