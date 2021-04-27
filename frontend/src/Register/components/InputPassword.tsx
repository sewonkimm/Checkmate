import React, {useState} from 'react';
import styled from 'styled-components';

interface Props {
  putPassword: (password: string) => void;
};

const InputPassword: React.FC<Props> = (props: Props) => {
  const [passwordValue, setPasswordValue] = useState<string>('');
  const [passwordCheck, setPasswordCheck] = useState<string>('');
  const [isValidPassword, setIsValidPassword] = useState<boolean>(false);
  const [isSamePassword, setIsSamePassword] = useState<boolean>(false);

  const isPassword = (password:string) => {
    const regExp = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,10}$/; // 8~10자 영문, 숫자 조합
    return regExp.test(password) // 형식에 맞는 경우 true 리턴
  };

  let timer: ReturnType<typeof setTimeout>;
  const checkValidPassword = (value:string) => {
    if (timer) {
      clearTimeout(timer);
    };
    timer = setTimeout(() => {
      if (isPassword(value)) {
        setIsValidPassword(true);
      } else {
        setIsValidPassword(false);
      }
    }, 300)
  };

  const checkSamePassword = (passwordCheck:string) => {
    // 같은지 확인 후에 props를 하는거라 굳이 다음버튼을 막을 필요없음. 형식이 안맞으면 props가 안가고 
    // 결국 가입이 안됨.
    if (passwordValue === passwordCheck) {

      setIsSamePassword(true);
      props.putPassword(passwordValue);
      // eslint-disable-next-line no-console
      console.log('비번 같음')
    } else {
      setIsSamePassword(false)
      // eslint-disable-next-line no-console
      console.log('비번 다름')
    }
  };

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const asValue = e.target.value
    checkValidPassword(asValue);
    setPasswordValue(asValue);
  };

  const onChangeCheckInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const asValue = e.target.value
    checkSamePassword(asValue)
    setPasswordCheck(asValue)
  };

  return(
    <>
      <Question>비밀번호를 입력해주세요</Question>
      <div>
        <PasswordInput 
          value={passwordValue}
          onChange={onChangeInput}
          placeholder="비밀번호 입력"
          type="password"
        />
        {passwordValue}
        <Warning>
          {passwordValue && (
            isValidPassword ? "사용가능한 비밀번호입니다" : "8~10자의 영문/숫자 조합을 사용하세요"
          )}
        </Warning>
        {isValidPassword && (
        <PasswordInput 
          value={passwordCheck}
          onChange={onChangeCheckInput}
          placeholder="비밀번호 확인"
          type="password"
        />)}
        <Warning>
            {passwordCheck && (
              isSamePassword ? "비밀번호가 일치합니다" : "비밀번호가 일치하지 않습니다."
            )}
        </Warning>
      </div>
    </>
  );
};

const Question = styled.h1``;
const Warning = styled.h3``;
const PasswordInput = styled.input``

export default InputPassword;