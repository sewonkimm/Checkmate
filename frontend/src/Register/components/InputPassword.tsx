import React, { useState } from 'react';
import styled from 'styled-components';

interface Props {
  password: string;
  putPassword: (password: string) => void;
}

const InputPassword: React.FC<Props> = ({ password, putPassword }: Props) => {
  const [passwordValue, setPasswordValue] = useState<string>(password);
  const [passwordCheck, setPasswordCheck] = useState<string>('');
  const [isValidPassword, setIsValidPassword] = useState<boolean>(true);
  const [isSamePassword, setIsSamePassword] = useState<boolean>(false);

  const isPassword = (password: string) => {
    const regExp = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,10}$/; // 8~10자 영문, 숫자 조합
    return regExp.test(password); // 형식에 맞는 경우 true 리턴
  };
  // 가짜 디바운스 입니다 추후 수정 요망 !
  let timer: ReturnType<typeof setTimeout>;
  const checkValidPassword = (value: string) => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      if (isPassword(value)) {
        setIsValidPassword(true);
      } else {
        setIsValidPassword(false);
      }
    }, 300);
  };

  const checkSamePassword = (passwordCheck: string) => {
    if (passwordValue === passwordCheck) {
      setIsSamePassword(true);
      putPassword(passwordValue);
    } else {
      setIsSamePassword(false);
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
      <Question>비밀번호를 입력해주세요</Question>
      <div>
        <PasswordInput
          checkValid={isValidPassword}
          value={passwordValue}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            onChangeInput(e.target.value, 'password');
          }}
          placeholder="비밀번호 입력"
          type="password"
        />
        <Warning isValid={isValidPassword}>
          {passwordValue && (isValidPassword ? '사용가능한 비밀번호입니다' : '8~10자의 영문/숫자 조합을 사용하세요')}
        </Warning>
        {isValidPassword && (
          <PasswordInputCheck
            checkSame={isSamePassword}
            value={passwordCheck}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              onChangeInput(e.target.value, 'passwordCheck');
            }}
            placeholder="비밀번호 확인"
            type="password"
          />
        )}
        <WarningDuple isSame={isSamePassword}>
          {passwordCheck && (isSamePassword ? '비밀번호가 일치합니다' : '비밀번호가 일치하지 않습니다.')}
        </WarningDuple>
      </div>
    </>
  );
};

const Question = styled.h1`
  font-size: 36px;
  font-weight: 560;
`;
const Warning = styled.h3<{ isValid: boolean }>`
  color: ${(props) => (props.isValid ? '#FFFFFF' : '#F600E1')};
  font-size: 18px;
`;
const PasswordInput = styled.input<{ checkValid: boolean }>`
  width: 473px;
  height: 72px;
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
  width: 473px;
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
