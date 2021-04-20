import React from 'react';
import styled from 'styled-components'

const Register: React.FC = () => {
  return (
    <Signup > Hello SignUP?!
    </Signup>
  );
};

const Signup = styled.div`
  color: ${props => props.theme.color.main};
  background-color: black;
`

export default Register;
