import React, { useState } from 'react';
import styled from 'styled-components';
import { debounce } from 'lodash';
import { useTranslation } from 'react-i18next';
import register from '../../../api/register';

interface Props {
  putNickname: (name: string) => void;
  preventNext: (value: React.SetStateAction<boolean>) => void;
  isAngry: (value: React.SetStateAction<boolean>) => void;
}

const InputNickname: React.FC<Props> = ({ putNickname, preventNext, isAngry }: Props) => {
  const { t } = useTranslation();

  const [nicknameValue, setNicknameValue] = useState<string>('');
  const [isValidNickname, setIsValidNickname] = useState<boolean>(true);
  const [isDuple, setIsDuple] = useState<boolean>(false);

  // 닉네임 유효성 검사
  const validateNickname = (nickname: string) => {
    if (nickname.length >= 4 && nickname.length <= 12) {
      return true;
    }
    return false;
  };

  // 닉네임 중복 검사
  // 디바운싱(추후 보완)
  const checkValidNickname = debounce((nickname: string) => {
    onSubmitForm(nickname);
  }, 400);

  const onSubmitForm = async (value: string) => {
    const response = await register.validateNicknameAPI(`members/nickName/${value}`);
    if (response === 0) {
      setIsDuple(false);
      putNickname(value); // 중복이 안되면 부모 컴포넌트에 닉네임 전달
      isAngry(false);
    } else {
      setIsDuple(false);
      preventNext(false); // 조건을 만족하지 않으면 다음 버튼 비활성화
      isAngry(true);
    }
  };

  // input event 핸들러
  const onChangeInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setNicknameValue(value);
    setIsValidNickname(validateNickname(value));

    if (validateNickname(value)) {
      checkValidNickname(value);
      isAngry(false); // 온화한 표정
    } else {
      preventNext(false); // 조건을 만족하지 않으면 다음 버튼 비활성화
      isAngry(true); // 찡글이 표정
    }
  };

  return (
    <>
      <Question>{t('regeister_title_nickname')}</Question>

      <NicknameInput
        isValid={isValidNickname}
        isDuple={isDuple}
        value={nicknameValue}
        onChange={onChangeInput}
        type="text"
        placeholder={t('register_placeholder_nickname')}
      />

      <Warning isValid={isValidNickname} isDuple={isDuple}>
        {nicknameValue && (isValidNickname ? '' : t('register_placeholder_nickname'))}
        {isDuple && t('register_msg_used_nickname')}
      </Warning>
    </>
  );
};

const Question = styled.h1`
  margin: 0;
  font-size: ${({ theme }) => theme.fontSizes.h3};
`;

const NicknameInput = styled.input<{ isValid: boolean; isDuple: boolean }>`
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

const Warning = styled.h3<{ isValid: boolean; isDuple: boolean }>`
  margin-top: 5px;
  color: ${(props) => (props.isValid && !props.isDuple ? '#FFFFFF' : '#F600E1')};
  font-size: ${({ theme }) => theme.fontSizes.body};
  font-weight: normal;
`;

export default InputNickname;
