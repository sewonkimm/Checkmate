import React, { useState } from 'react';
import styled from 'styled-components';
import validateEmailAPI from '../../api/register';

interface Props {
  putEmail: (emailValue: string) => void;
}

const InputEmail: React.FC<Props> = (props: Props) => {
  const [emailValue, setEmailValue] = useState<string>('');
  const [isValidEmail, setIsValidEmail] = useState<boolean>(false);
  const [isDuple, setIsDuple] = useState<boolean>(false);

  // Email 유효성 판단 함수
  const isEmail = (email: string) => {
    // eslint-disable-next-line no-useless-escape
    const regExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    return regExp.test(email); // 형식에 맞으면 true 리턴
  };
  // 유효성 검사 함수
  let timer: ReturnType<typeof setTimeout>;
  const checkValidEmail = (email: string) => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      if (isEmail(email)) {
        setIsValidEmail(true);
      } else {
        setIsValidEmail(false);
      }
    }, 300);
  };

  // input event 핸들러
  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    checkValidEmail(e.target.value);
    setEmailValue(e.target.value);
  };

  const onSubmitForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isValidEmail) {
      const response = await validateEmailAPI(`/members/email/${emailValue}`);
      if (response === 0) {
        setIsDuple(true);
        props.putEmail(emailValue); // 중복이 안되면 부모 컴포넌트에 email 전달
      } else {
        setIsDuple(false);
      }
    }
  };

  return (
    <>
      <QuestionBox>이메일을 입력하세요</QuestionBox>
      <Warning>{emailValue && (isValidEmail ? '사용 가능한 이메일입니다' : '유효하지 않은 이메일입니다')}</Warning>
      <div>
        <form onSubmit={onSubmitForm}>
          <EmailInput value={emailValue} onChange={onChangeInput} type="text" placeholder="ssafy123@ssafy.com" />
          <CheckDupleBtn>중복 체크</CheckDupleBtn>
          <span>{isDuple ? '사용가능한 이메일 입니다' : '중복하는 이메일입니다'}</span>
        </form>
      </div>
    </>
  );
};
const QuestionBox = styled.h1``;
const Warning = styled.h3``;
const EmailInput = styled.input``;
const CheckDupleBtn = styled.button``;

export default InputEmail;
