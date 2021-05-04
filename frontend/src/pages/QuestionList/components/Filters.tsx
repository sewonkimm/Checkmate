import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

type PropsType = {
  onOnlyMyQuestion: () => void;
};

const Filters = ({ onOnlyMyQuestion }: PropsType): ReactElement => {
  return (
    <FilterWrap>
      <MyQuestionListBtn onClick={onOnlyMyQuestion}>내 질문만 보기</MyQuestionListBtn>
      <WriteBtn to="/question/write">질문 작성</WriteBtn>
    </FilterWrap>
  );
};

const FilterWrap = styled.div`
  width: 80vw;
  max-width: 1200px;
  margin: 86px auto 34px auto;
  display: flex;
  justify-content: space-between;
`;
const MyQuestionListBtn = styled.button`
  width: 9rem;
  hegith: 3rem;
  font-size: 1rem;
  padding: 10px 12px;
  border-radius: 8px;
  color: ${({ theme }) => theme.colors.white};
  background-color: ${({ theme }) => theme.colors.primary};
`;

const WriteBtn = styled(Link)`
  width: 9rem;
  hegith: 3rem;
  font-size: 1rem;
  text-decoration: none;
  padding: 10px 12px;
  border-radius: 8px;
  color: ${({ theme }) => theme.colors.white};
  background-color: ${({ theme }) => theme.colors.primary};
`;

export default Filters;
