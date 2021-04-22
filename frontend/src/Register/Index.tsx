/*
Register/Index.tsx
: 회원가입 페이지
*/

import React from 'react';
import styled from 'styled-components';

const Register: React.FC = () => {
  return <Signup> 회원가입 페이지</Signup>;
};

const Signup = styled.div`
  color: ${(props) => props.theme.color.main};
  background-color: black;
`;

export default Register;
