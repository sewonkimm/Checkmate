import React from 'react';
import styled from 'styled-components';

const Filters: React.FC = () => {
  return (
    <FilterWrap>
      <FilterBtn>내 질문만 보기</FilterBtn>
      <FilterBtn>질문 작성</FilterBtn>
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

const FilterBtn = styled.button`
  width: 9rem;
  hegith: 3rem;
  font-size: 1rem;
  padding: 10px 12px;
  border-radius: 8px;
  color: ${({ theme }) => theme.colors.white};
  background-color: ${({ theme }) => theme.colors.primary};
`;

export default Filters;
