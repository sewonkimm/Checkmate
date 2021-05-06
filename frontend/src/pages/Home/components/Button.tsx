import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

// Button props 관련 type 설정
// Type은 primary 아니면 secondary type 2개만 받기 때문에 enum으로 설정
enum ButtonType {
  Primary = 'primary',
  Secondary = 'secondary',
}

interface ButtonsProps {
  type: string;
  text: string;
}

const Button = ({ type, text }: ButtonsProps): ReactElement => {
  return (
    <>
      {type === ButtonType.Primary ? (
        <PrimaryBtn>
          <LinkText to="/check/mate">{text}</LinkText>
        </PrimaryBtn>
      ) : (
        <SecondaryBtn>
          <LinkText to="/check/ai">{text}</LinkText>
        </SecondaryBtn>
      )}
    </>
  );
};

// Button style
const Btn = styled.div`
  width: 236px;
  height: 72px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  font-size: 20px;
  font-weight: bold;
  letter-spacing: 0.005em;
  cursor: pointer;
`;

const PrimaryBtn = styled(Btn)`
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
`;
const SecondaryBtn = styled(Btn)`
  background-color: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.primary};
  border: 3px solid ${({ theme }) => theme.colors.primary};
`;

const LinkText = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

export default Button;
