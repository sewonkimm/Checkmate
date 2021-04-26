/*
Register/Index.tsx
: 회원가입 페이지
*/

import React, { useState } from 'react';
import styled from 'styled-components';
import MotherLanguage from './MotherLanguage'
import InputEmail from './InputEmail'
import Nickname from './Nickname';
import RegisterComplete from './RegisterComplete'

import MotherLanguage from './MotherLanguage'
import InputForm from './InputForm'

const Register: React.FC = () => {
  const [step, setStep] = useState<number>(0)
  const [selectedLanguage, setSelectedLanguage] = useState<string>('')

  // 컴포넌트가 4개가있다
  // 다음버튼을 누르면 step ++, 그러면 첫번째 컴포넌트는 display:none이 되고 2번째 컴포넌트가 보여지게 된다.



  const handleNextBtn = () => {
    if (step >= 0 && step < registerGroup.length-1) {
      setStep(step + 1)
    } else {
      // eslint-disable-next-line no-alert
      window.alert('out of index')
    }
  }
  const handlePrevBtn = () => {
    if (step > 0 && step < registerGroup.length) {
      setStep(step - 1)
    } else {
      // eslint-disable-next-line no-alert
      window.alert('out of index')
    }
  }

  const setLang = (language:string) => {
    // props로 전달받은 선택한 언어로 스테이트를 바꿈
    setSelectedLanguage(language)
  }

  // 컴포넌트를 갖고 있는 배열 
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const registerGroup: Array <any> = [
    <MotherLanguage setLang={setLang} />, 
    <InputEmail />,
    <Nickname />,
    <RegisterComplete />,
  ]

  return(
    <RegisterWrap>
      <div>
        {step + 1} / {registerGroup.length}
      </div>
      {selectedLanguage}
      {registerGroup[step]}
      <div>
        {step > 0 ? 
          (<PrevBtn onClick={handlePrevBtn}>이전으로</PrevBtn>) : 
          (null)
        }
        <NextBtn onClick={handleNextBtn}>다음으로</NextBtn>
      </div>
    </RegisterWrap>
    
  ) 
    

};

const RegisterWrap = styled.div``;
const NextBtn = styled.button``;
const PrevBtn =styled.button``;
export default Register;
