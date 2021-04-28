import React from 'react';
import styled from 'styled-components';

interface Props {
  // props를 받기 위해 타입을 지정
  putLang: (language: string) => void;
};

// props를 인자로 지정
const MotherLanguage: React.FC<Props> = (props: Props) => {

  const selectItem = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    props.putLang(e.target.value)
  };
  const options: Array<{label: string; value: string;}> = [
    {
      label: "언어를 선택해 주세요",
      value: ""
    },
    {
      label: "한국어",
      value: "ko"
    },
    {
      label: "영어",
      value: "en"
    },
    {
      label: "중국어",
      value: "zh"
    },
  ];
  return (
    <>
      <Question>당신의 모국어를 선택해주세요</Question>
      <div>
          <LanguageSelect defaultValue={0} onChange={selectItem}>
            {options.map((option, idx) => {
              if (idx === 0) {
                return(<Option key={option.label+option.value} hidden>{option.label}</Option>)}
              return (
              <Option 
              key={option.label + option.value} 
              value={option.value} 
              >
                {option.label}
              </Option>
            )})}
          </LanguageSelect>
      </div>
    </>
  );
};

const Question = styled.h1``;
const LanguageSelect = styled.select`
  width: 473px;
  padding: 0.8em 0.5em;
  font-family: inherit;
  font-size: 24px;
  border: 3px solid #038EFC;
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.white};
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  &:hover {
    cursor: pointer;
  }
`;
const Option = styled.option`
  border-radius: 10px;
`;

export default MotherLanguage;
