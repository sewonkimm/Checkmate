import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const SERVER_URL = `https://k4a106.p.ssafy.io/api`
interface Props {
  putEmail: (emailValue: string) => void;
}

const InputEmail: React.FC<Props> = (props: Props) => {
  const [emailValue, setEmailValue] = useState<string>('');
  const [isValidEmail, setIsValidEmail] = useState<boolean>(false);
  const [dupleMsg, setDupleMsg] = useState<string>('');

  // Email 유효성 판단 함수
  const isEmail = (email:string) => {
    // eslint-disable-next-line no-useless-escape
    const regExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    return regExp.test(email); // 형식에 맞으면 true 리턴
  };
  // 유효성 검사 함수
  let timer: ReturnType<typeof setTimeout>;
  const checkValidEmail = (email:string) => {
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
  // 리턴값이 1이면 중복
  const onSubmitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isValidEmail) {
      axios.get(`${SERVER_URL}members/email/${emailValue}`)
      .then((res) => {
        const duplicated:number = res.data
        if (duplicated === 0) {
          setDupleMsg('사용가능한 이메일입니다')
          // 중복이 안되면 props로 부모에게 보낸다.
          props.putEmail(emailValue);
        } else {
          setDupleMsg('중복된 이메일입니다.')
        }
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.log(err)
      })
    };
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
