import React from 'react'
import styled from 'styled-components';


const InputEmail = () => {


  return (
    <>
      <QuestionBox>이메일을 입력하세요</QuestionBox>
      <EmailInput
        // onChangeinput 삽입
        type="text"
        placeholder="ssafy123@ssafy.com" 
      />
       
    </>
  )
}
const QuestionBox = styled.h1``
const EmailInput = styled.input``

export default InputEmail