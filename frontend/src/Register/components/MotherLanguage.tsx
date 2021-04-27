import React, { useState } from 'react';
import styled from 'styled-components';

interface Props {
  // props를 받기 위해 타입을 지정
  putLang: (language: string) => void;
};

// props를 인자로 지정
const MotherLanguage: React.FC<Props> = (props: Props) => {
  const [showMenu, setShowMenu] = useState<boolean>(false);

  const handleMenu = () => {
    setShowMenu(!showMenu);
  };
  const selectItem = (e: React.MouseEvent<HTMLElement>) => {
    // 타입스크립트는 as HTMLElement로 지정해야 innerHTML이 찾아진다.
    const target = e.target as HTMLElement;
    props.putLang(target.innerHTML);
  };
  return (
    <>
      <Question>당신의 모국어를 선택해주세요</Question>
      <div>
        <LanguageSelectBtn onClick={handleMenu}>언어 선택하기</LanguageSelectBtn>
        {showMenu && (
          <div>
            <MenuItem onClick={selectItem}>영어</MenuItem>
            <MenuItem onClick={selectItem}>중국어</MenuItem>
            <MenuItem onClick={selectItem}>한국어</MenuItem>
          </div>
        )}
      </div>
    </>
  );
};

const Question = styled.h1``;
const LanguageSelectBtn = styled.button``;
const MenuItem = styled.button``;
export default MotherLanguage;
