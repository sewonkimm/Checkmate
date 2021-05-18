import React, { ReactElement, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import Switch from 'react-switch';

type PropsType = {
  id: number;
  handleMyQuestion: () => void;
};

const Filters = ({ handleMyQuestion, id }: PropsType): ReactElement => {
  const { t } = useTranslation();
  const [checked, setChecked] = useState<boolean>(false);

  const handleChange = () => {
    setChecked(!checked);
    handleMyQuestion();
  };

  return (
    <FilterWrap>
      {id > 0 && (
        <>
          <WriteBtn to="/question/write">{t('list_button_write')}</WriteBtn>
          <Label>
            <span>{t('list_button_filter')}</span>
            <Switch onChange={handleChange} checked={checked} uncheckedIcon={false} checkedIcon={false} />
          </Label>
        </>
      )}
    </FilterWrap>
  );
};

const FilterWrap = styled.div`
  width: 80vw;
  max-width: 985px;
  margin: 80px auto 0;
  display: flex;
  justify-content: space-between;
`;

const WriteBtn = styled(Link)`
  hegith: 56px;
  text-decoration: none;
  padding: 10px 35px;
  border-radius: 10px;
  font-size: ${({ theme }) => theme.fontSizes.body};
  color: ${({ theme }) => theme.colors.white};
  background-color: ${({ theme }) => theme.colors.primary};
  transition: all 0.3s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.accent};
    transform: scale(0.95);
  }
`;

const Label = styled.label`
  display: flex;
  flex-direction: row;
  gap: 10px;
  justify-content: center;
  align-items: center;
  font-size: ${({ theme }) => theme.fontSizes.body};
`;
export default Filters;
