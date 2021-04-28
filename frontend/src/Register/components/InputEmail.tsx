import React, { useState } from 'react';
import styled from 'styled-components';
import validateEmailAPI from '../../api/register';

interface Props {
  putEmail: (emailValue: string) => void;
}

const InputEmail: React.FC<Props> = (props: Props) => {
  const [emailValue, setEmailValue] = useState<string>('');
  const [isValidEmail, setIsValidEmail] = useState<boolean>(false);
  const [dupleMsg, setDupleMsg] = useState<string>('');

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
        setDupleMsg('이메일 노중복');
        props.putEmail(emailValue); // 중복이 안되면 부모 컴포넌트에 email 전달
      } else {
        setDupleMsg('이메일 중복');
      }
    }
  };

  return (
    <>
      <QuestionBox>이메일을 입력하세요</QuestionBox>
      <Warning>
        {emailValue && (
          isValidEmail ? "사용 가능한 이메일입니다" : "유효하지 않은 이메일입니다"
        )}
      </Warning>
      <EmailInputWrapper>
        <form onSubmit={onSubmitForm}>
          <EmailInput
            value={emailValue}
            onChange={onChangeInput}
            type="text"
            placeholder="ssafy123@ssafy.com"
          />
        </form>
          <CheckDupleBtn>중복 체크</CheckDupleBtn>
      </EmailInputWrapper>
      {dupleMsg && <h3>{dupleMsg}</h3>}
    </>
  );
};
const QuestionBox = styled.h1`
  font-size: 36px;
`;
const Warning = styled.h3``;
const EmailInputWrapper = styled.div`
  width: 473px;
  display: flex;
`;
const EmailInput = styled.input`
  flex-basis: 60%;
  height: 72px;
  border-radius: 8px;
  padding: 22px 25px 23px 25px;
  &::placeholder {
    color: #038EFC;
    opacity: 0.55;
    font-weight: 400;
    font-size: 18px;
  }
`;
const CheckDupleBtn = styled.button`
  display: block;
  flex-basis: 40%;
`;

export default InputEmail;
