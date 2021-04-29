import React from 'react';
import styled from 'styled-components';

interface Props {
  putLang: (language: string) => void;
}

const MotherLanguage: React.FC<Props> = (props: Props) => {
  const selectItem = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    props.putLang(e.target.value);
  };
  const options: Array<{ label: string; value: string }> = [
    {
      label: '언어를 선택해 주세요',
      value: '',
    },
    {
      label: '한국어',
      value: 'ko',
    },
    {
      label: 'English',
      value: 'en',
    },
    {
      label: '中文',
      value: 'zh',
    },
  ];
  return (
    <>
      <QuestionBox>모국어를 선택해주세요</QuestionBox>

      <LanguageSelect defaultValue={0} onChange={selectItem}>
        {options.map((option, idx) => {
          if (idx === 0) {
            return (
              <Option key={option.label + option.value} hidden>
                {option.label}
              </Option>
            );
          }
          return (
            <Option key={option.label + option.value} value={option.value}>
              {option.label}
            </Option>
          );
        })}
      </LanguageSelect>
    </>
  );
};

const QuestionBox = styled.h1`
  margin: 0;
  font-size: ${({ theme }) => theme.fontSizes.h3};
`;

const LanguageSelect = styled.select`
  width: 100%;
  margin: 20px 0;
  padding: 0.8em 0.5em;
  font-family: inherit;
  font-size: ${({ theme }) => theme.fontSizes.title};
  border: 3px solid #038efc;
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
