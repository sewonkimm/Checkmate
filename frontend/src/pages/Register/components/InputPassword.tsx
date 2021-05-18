import React, { useState } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

interface Props {
  putPassword: (password: string) => void;
  preventNext: (value: React.SetStateAction<boolean>) => void;
  isAngry: (value: React.SetStateAction<boolean>) => void;
}

const InputPassword: React.FC<Props> = ({ putPassword, preventNext, isAngry }: Props) => {
  const { t } = useTranslation();

  const [passwordValue, setPasswordValue] = useState<string>('');
  const [passwordCheck, setPasswordCheck] = useState<string>('');
  const [isValidPassword, setIsValidPassword] = useState<boolean>(true);
  const [isSamePassword, setIsSamePassword] = useState<boolean>(true);

  const validatePassword = (password: string) => {
    const regExp = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,10}$/; // 8~10자 영문, 숫자 조합
    return regExp.test(password); // 형식에 맞는 경우 true 리턴
  };

  // 비밀번호 유효성 검사
  const checkValidPassword = (value: string) => {
    if (validatePassword(value)) {
      setIsValidPassword(true);
      isAngry(false);
    } else {
      setIsValidPassword(false);
      preventNext(false); // 조건을 만족하지 않으면 다음 버튼 비활성화
      isAngry(true);
    }
  };

  // 비밀번호 확인 유효성 검사
  const checkSamePassword = (passwordCheck: string) => {
    if (passwordValue === passwordCheck) {
      setIsSamePassword(true);
      putPassword(passwordValue);
      isAngry(false); // 온화한 표정
    } else {
      setIsSamePassword(false);
      preventNext(false); // 조건을 만족하지 않으면 다음 버튼 비활성화
      isAngry(true); // 찡글이 표정
    }
  };

  const onChangeInput = (value: string, type: string) => {
    if (type === 'password') {
      checkValidPassword(value);
      setPasswordValue(value);
    } else {
      checkSamePassword(value);
      setPasswordCheck(value);
    }
  };

  return (
    <>
      <Question>{t('regeister_title_password')}</Question>

      <PasswordInput
        checkValid={isValidPassword}
        value={passwordValue}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          onChangeInput(e.target.value, 'password');
        }}
        placeholder={t('register_placeholder_password')}
        type="password"
      />
      <Warning isValid={isValidPassword}>
        {passwordValue && (isValidPassword ? '' : t('register_placeholder_password'))}
      </Warning>

      {/* 비밀번호 유효성을 통과했을 때에만 비밀번호 확인 표시 */}
      {isValidPassword && passwordValue && (
        <PasswordInputCheck
          checkSame={isSamePassword}
          value={passwordCheck}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            onChangeInput(e.target.value, 'passwordCheck');
          }}
          placeholder={t('register_password_confirm_placeholder')}
          type="password"
        />
      )}
      <WarningDuple isSame={isSamePassword}>
        {isValidPassword && passwordCheck && (isSamePassword ? '' : t('register_msg_incorrect_password'))}
      </WarningDuple>
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
const PasswordInput = styled.input<{ checkValid: boolean }>`
  width: 100%;
  height: 72px;
  margin: 20px 0 0 0;
  padding: 22px 25px 23px 25px;
  font-size: 18px;
  border-radius: 8px;
  border: 3px solid ${(props) => (props.checkValid ? '#038EFC' : '#F016DE')};
  color: ${(props) => (props.checkValid ? '#038EFC' : '#F016DE')};
  &::placeholder {
    color: #038efc;
    opacity: 0.55;
    font-weight: 400;
    font-size: 18px;
  }
  &:focus {
    outline: none;
  }
`;
const PasswordInputCheck = styled.input<{ checkSame: boolean }>`
  width: 100%;
  height: 72px;
  padding: 22px 25px 23px 25px;
  font-size: 18px;
  border-radius: 8px;
  border: 3px solid ${(props) => (props.checkSame ? '#038EFC' : '#F016DE')};
  color: ${(props) => (props.checkSame ? '#038EFC' : '#F016DE')};
  &::placeholder {
    color: #038efc;
    opacity: 0.55;
    font-weight: 400;
    font-size: 18px;
  }
  &:focus {
    outline: none;
  }
`;
const WarningDuple = styled.h3<{ isSame: boolean }>`
  color: ${(props) => (props.isSame ? '#FFFFFF' : '#F600E1')};
  font-size: 18px;
`;

export default InputPassword;
