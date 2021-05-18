import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

interface Props {
  putLang: (language: string) => void;
}

const MotherLanguage: React.FC<Props> = (props: Props) => {
  const { t, i18n } = useTranslation();

  const selectItem = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    const lang = e.target.value;

    props.putLang(lang);
    i18n.changeLanguage(lang);
  };
  const options: Array<{ label: string; value: string }> = [
    {
      label: t('regeister_title_language'),
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
      <Question>{t('regeister_title_language')}</Question>

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

const Question = styled.h1`
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
