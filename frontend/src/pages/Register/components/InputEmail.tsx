import React, { useState } from 'react';
import { debounce } from 'lodash';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import register from '../../../api/register';

interface Props {
  putEmail: (emailValue: string) => void;
  preventNext: (value: React.SetStateAction<boolean>) => void;
  isAngry: (value: React.SetStateAction<boolean>) => void;
}

const InputEmail: React.FC<Props> = ({ putEmail, preventNext, isAngry }: Props) => {
  const { t } = useTranslation();
  const [emailValue, setEmailValue] = useState<string>('');
  const [isValidEmail, setIsValidEmail] = useState<boolean>(true);
  const [isDuple, setIsDuple] = useState<boolean>(false);

  // Email 유효성 검사
  const validateEmail = (email: string) => {
    // eslint-disable-next-line no-useless-escape
    const regExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    return regExp.test(email); // 형식에 맞으면 true 리턴
  };

  // Email 중복 검사
  // 디바운싱(추후 보완)
  const checkValidEmail = debounce(async (value: string) => {
    if (isValidEmail) {
      onSubmitForm(value);
    }
  }, 400);

  const onSubmitForm = async (email: string) => {
    if (isValidEmail && emailValue) {
      const response = await register.validateEmailAPI(`members/email/${email}`);
      if (response === 0) {
        setIsDuple(false);
        putEmail(email); // 중복이 안되면 부모 컴포넌트에 email 전달
        isAngry(false); // 웃는 표정
      } else {
        setIsDuple(true);
        preventNext(false); // 조건을 만족하지 않으면 다음 버튼 비활성화
        isAngry(true); // 찡글이 표정
      }
    }
  };

  // input event 핸들러
  const onChangeInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setEmailValue(value);
    if (validateEmail(value)) {
      setIsValidEmail(true);
      isAngry(false); // 온화한 표정
    } else {
      setIsValidEmail(false);
      preventNext(false); // 조건을 만족하지 않으면 다음 버튼 비활성화
      isAngry(true); // 찡글이 표정
    }
    await checkValidEmail(value);
  };

  return (
    <>
      <Question>{t('regeister_title_email')}</Question>
      <EmailInput
        isValid={isValidEmail}
        isDuple={isDuple}
        value={emailValue}
        onChange={onChangeInput}
        type="text"
        placeholder="ssafy123@ssafy.com"
      />
      <Warning isValid={isValidEmail} isDuple={isDuple}>
        {emailValue && !isValidEmail && t('register_msg_invalid_email')}
        {isDuple && t('register_msg_used_email')}
      </Warning>
    </>
  );
};

const Question = styled.h1`
  margin: 0;
  font-size: ${({ theme }) => theme.fontSizes.h3};
`;

const Warning = styled.h3<{ isValid: boolean; isDuple: boolean }>`
  margin-top: 5px;
  color: ${(props) => (props.isValid && !props.isDuple ? '#FFFFFF' : '#F600E1')};
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
