import React, { ReactElement } from 'react';
import styled from 'styled-components';

type PropsType = {
  origin: string;
  input: string;
};

const Diff = ({ origin, input }: PropsType): ReactElement => {
  return (
    <DiffContainer>
      <TextBox>{origin}</TextBox>
      <TextBox>{input}</TextBox>
    </DiffContainer>
  );
};

const DiffContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  width: 100%;
`;

const TextBox = styled.div`
  border: 2px solid ${({ theme }) => theme.colors.whiteD9};
  border-radius: 15px;
  line-height: 30px;
  padding: 30px;
`;

export default Diff;
