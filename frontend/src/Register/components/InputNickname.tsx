import React, { useState } from 'react';
import styled from 'styled-components';
import { debounce } from 'lodash';
import register from '../../api/register';

interface Props {
  putNickname: (name: string) => void;
}

const InputNickname: React.FC<Props> = (props: Props) => {
  const [nicknameValue, setNicknameValue] = useState<string>('');
  const [isValidNickname, setIsValidNickname] = useState<boolean>(false);
  const [warningMsg, setWarningMsg] = useState<string>('');
  const [isDuple, setIsDuple] = useState<boolean>(false);

  const checkValidNickname = debounce((nickname: string) => {
    onSubmitForm(nickname);
  }, 400);

  const checkNickname = (nickname: string) => {
    const regExp = /^[a-z0-9]{4,12}$/; // 4~12자리 닉네임을 만들수 있습니다. 한글은 안된다
    return regExp.test(nickname);
  };

  // input event 핸들러
  const onChangeInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setNicknameValue(value);
    setIsValidNickname(checkNickname(value));
    if (checkNickname(value)) {
      checkValidNickname(value);
    }
  };

  // 닉네임 중복여부 확인
  const onSubmitForm = async (value: string) => {
    const response = await register.validateNicknameAPI(`members/nickName/${value}`);
    if (response === 0) {
      setWarningMsg('사용가능한 닉네임입니다');
      props.putNickname(value);
      setIsDuple(true);
    } else {
      setWarningMsg('중복되는 닉네임입니다');
      setIsDuple(false);
    }
  };

  return (
    <>
      <QuestionBox>닉네임을 입력해주세요</QuestionBox>
      <ValidMsg isValid={isValidNickname}>
        {nicknameValue &&
          (isValidNickname ? '사용가능한 닉네임입니다.' : '영어, 숫자로 4~12자리 닉네임으로 만들어주세요')}
      </ValidMsg>

      <NicknameInput
        isValidNickname={isValidNickname}
        value={nicknameValue}
        onChange={onChangeInput}
        type="text"
        placeholder="닉네임"
      />

      <Warning isDuple={isDuple}>{warningMsg}</Warning>
    </>
  );
};

const QuestionBox = styled.h1`
  font-size: 36px;
  font-weight: 560;
`;

const ValidMsg = styled.h3<{ isValid: boolean }>`
  color: ${(props) => (props.isValid ? '#FFFFFF' : '#F600E1')};
  font-size: 18px;
`;

const Warning = styled.h3<{ isDuple: boolean }>`
  color: ${(props) => (props.isDuple ? '#FFFFFF' : '#F600E1')};
  font-size: 18px;
`;

const NicknameInput = styled.input<{ isValidNickname: boolean }>`
  width: 473px;
  height: 72px;
  padding: 22px 25px 23px 25px;
  font-size: 18px;
  color: ${(props) => (props.isValidNickname ? '#038EFC' : '#F016DE')};
  border-radius: 8px;
  border: 3px solid ${(props) => (props.isValidNickname ? '#038EFC' : '#F016DE')};
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

export default InputNickname;
