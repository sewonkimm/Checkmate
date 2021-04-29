import React, { useState } from 'react';
import { debounce } from 'lodash';
import styled from 'styled-components';
import register from '../../api/register';

interface Props {
  putEmail: (emailValue: string) => void;
}

const InputEmail: React.FC<Props> = ({ putEmail }: Props) => {
  const [emailValue, setEmailValue] = useState<string>(''); // 컴포넌트가 변경되어도 입력한 값을 동일하게 유지
  const [isValidEmail, setIsValidEmail] = useState<boolean>(true);
  const [isDuple, setIsDuple] = useState<boolean>(false);

  // Email 유효성 판단 함수
  const validateEmail = (email: string) => {
    // eslint-disable-next-line no-useless-escape
    const regExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    return regExp.test(email); // 형식에 맞으면 true 리턴
  };

  // 유효성 검사 함수
  const checkValidEmail = debounce(async (value: string) => {
    if (isValidEmail) {
      onSubmitForm(value);
    }
  }, 400);

  // input event 핸들러
  const onChangeInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setEmailValue(value);
    await setIsValidEmail(validateEmail(value));
    await checkValidEmail(value);
  };

  const onSubmitForm = async (email: string) => {
    if (isValidEmail && emailValue) {
      const response = await register.validateEmailAPI(`members/email/${email}`);
      if (response === 0) {
        setIsDuple(false);
        putEmail(email); // 중복이 안되면 부모 컴포넌트에 email 전달
      } else {
        setIsDuple(true);
      }
    }
  };

  return (
    <>
      <Question>이메일을 입력하세요</Question>
      <EmailInput
        isValid={isValidEmail}
        isDuple={isDuple}
        value={emailValue}
        onChange={onChangeInput}
        type="text"
        placeholder="ssafy123@ssafy.com"
      />
      <Warning isValid={isValidEmail}>{emailValue && !isValidEmail && '유효하지 않은 이메일입니다'}</Warning>
      <Warning isValid={isDuple}>{isDuple && '이미 사용중인 이메일입니다'}</Warning>
    </>
  );
};

const Question = styled.h1`
  margin: 0;
  font-size: ${({ theme }) => theme.fontSizes.h3};
`;

const Warning = styled.h3<{ isValid: boolean }>`
  margin-top: 5px;
  color: ${(props) => (props.isValid ? '#FFFFFF' : '#F600E1')};
  font-size: ${({ theme }) => theme.fontSizes.body};
  font-weight: normal;
`;

const EmailInput = styled.input<{ isValid: boolean; isDuple: boolean }>`
  width: 100%;
  height: 72px;
  margin-top: 20px;
  border: 3px solid ${(props) => (props.isValid && !props.isDuple ? '#038EFC' : '#F016DE')};
  border-radius: 8px;
  padding: 22px 25px 23px 25px;
  color: ${(props) => (props.isValid && !props.isDuple ? '#038EFC' : '#F016DE')};
  font-size: ${({ theme }) => theme.fontSizes.body};
  &::placeholder {
    color: ${({ theme }) => theme.colors.secondary};
    opacity: 0.55;
    font-size: ${({ theme }) => theme.fontSizes.body};
    font-weight: normal;
  }
  &:focus {
    outline: none;
  }
`;

export default InputEmail;
