/*
Register/Index.tsx
: 회원가입 페이지
*/

import React from 'react';
import styled from 'styled-components';

import MotherLanguage from './MotherLanguage'
import InputForm from './InputForm'

const Register: React.FC = () => {
  return (
    <>
      <RegisterContainer>
        <MotherLanguage />
        <InputForm />
      </RegisterContainer>
    </>
  );
};

const RegisterContainer = styled.div`
  background-color: blue;
`


export default Register;
