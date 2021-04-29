import React, { useState } from 'react';
import { debounce } from 'lodash';
import styled from 'styled-components';
import validateEmailAPI from '../../api/register';

interface Props {
  putEmail: (emailValue: string) => void;
}

const InputEmail: React.FC<Props> = (props: Props) => {
  const [emailValue, setEmailValue] = useState<string>('');
  const [isValidEmail, setIsValidEmail] = useState<boolean>(false);
  const [dupleMsg, setDupleMsg] = useState<string>('');
  const [isDuple, setIsDuple] = useState<boolean>(false);

  // Email 유효성 판단 함수
  const isEmail = (email: string) => {
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
  const onChangeInput = async (e:  React.ChangeEvent<HTMLInputElement>) => {
    const {value} = e.target
    setEmailValue(value);
    await setIsValidEmail(isEmail(value))
    await checkValidEmail(value);
  };

    


  const onSubmitForm = async (email: string) => {
    if (isValidEmail) {
      // eslint-disable-next-line no-console
      console.log('api 호출');
      const response = await validateEmailAPI(`/members/email/${email}`);
      if (response === 0) {
        setDupleMsg('사용가능한 이메일입니다 :)');
        setIsDuple(true);
        props.putEmail(email); // 중복이 안되면 부모 컴포넌트에 email 전달
      } else {
        setDupleMsg('중복하는 이메일입니다 :(');
        setIsDuple(false);
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
        <EmailInput checkDuple={isDuple}
          value={emailValue}
          onChange={onChangeInput}
          type="text"
          placeholder="ssafy123@ssafy.com"
        />
      </EmailInputWrapper>
      {dupleMsg && 
      <DupleMsgWrapper isDuple={isDuple}>
        {dupleMsg}
      </DupleMsgWrapper>}
    </>
  );
};
const QuestionBox = styled.h1`
  font-size: 36px;
`;
const Warning = styled.h3``;
const EmailInputWrapper = styled.div`
  width: 473px;
`;
const EmailInput = styled.input<{ checkDuple : boolean }>`
  width: 100%;
  height: 72px;
  border: 3px solid ${(props) => (props.checkDuple ? '#038EFC' : '#F016DE')};
  border-radius: 8px;
  padding: 22px 25px 23px 25px;
  color: ${(props) => (props.checkDuple ? '#038EFC' : '#F016DE')};
  font-size: 18px;
  &::placeholder {
    color: #038EFC;
    opacity: 0.55;
    font-weight: 400;
    font-size: 18px;
  }
  &:focus {
    outline: none;
  }
`;
const DupleMsgWrapper = styled.h3<{isDuple: boolean}>`
  color: ${(props) => (props.isDuple? '#FFFFFF' : '#F600E1')};
`;

export default InputEmail;
