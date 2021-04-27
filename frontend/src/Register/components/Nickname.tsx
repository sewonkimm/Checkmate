import React, {useState} from 'react';
import styled from 'styled-components';
import axios from 'axios';

const SERVER_URL = `http://k4a106.p.ssafy.io/api`
interface Props {
  putNickname: (name: string) => void;
}

const Nickname: React.FC<Props> = (props: Props) => {

  const [nicknameValue, setNicknameValue] = useState<string>('');
  const [isValidNickname, setIsValidNickname] = useState<boolean>(false);
  const [warningMsg, setWarningMsg] = useState<string>('');

  // 닉네임 중복여부 확인
  const onSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios.get(`${SERVER_URL}/members/nickName/${nicknameValue}`)
    .then((res) => {
      const duplicated:number = res.data;
      if (duplicated === 0) {
        setWarningMsg('사용가능한 닉네임입니다')
        props.putNickname(nicknameValue);
      } else {
        setWarningMsg('중복되는 닉네임입니다')
      };
    });
  };

  const isNickname = (name:string) => {
    const regExp = /^[a-z0-9]{4,12}$/; // 4~12자리 닉네임을 만들수 있습니다. 한글은 안된다
    setIsValidNickname(regExp.test(name));
  };

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    isNickname(e.target.value);
    setNicknameValue(e.target.value);
  };

  return (
    <>
      <QuestionBox>닉네임을 입력해주세요</QuestionBox>
      <ValidMsg>
        {nicknameValue && (
          isValidNickname ? "사용가능한 닉네임입니다." : 
          "영어, 숫자로 4~12자리 닉네임으로 만들어주세요"
        )}
      </ValidMsg>
      <form onSubmit={onSubmitForm}>
        <NicknameInput 
          value={nicknameValue}
          onChange={onChangeInput}
          type="text"
          placeholder="닉네임"
        />
        <DupleCheckBtn>중복 체크</DupleCheckBtn>
      </form>
      <Warning>
        {warningMsg}
      </Warning>
    </>
  );
};

const QuestionBox = styled.h1``;
const ValidMsg = styled.h3``;
const Warning = styled.span``;
const NicknameInput = styled.input``;
const DupleCheckBtn = styled.button``;
export default Nickname;
