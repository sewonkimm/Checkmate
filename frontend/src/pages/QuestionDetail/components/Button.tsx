/* eslint-disable react/destructuring-assignment */
import React, { ReactElement } from 'react';
import styled from 'styled-components';

// Button props 관련 type 설정
// Type은 수정 아니면 삭제이기 때문에 enum으로 설정
enum ButtonType {
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
}

type PropsType = {
  type: string;
};

const Button = (props: PropsType): ReactElement => {
  const handleUpdate = () => {
    console.log('update');
  };
  const handleDelete = () => {
    console.log('delete');
  };

  return (
    <>
      {props.type === ButtonType.UPDATE ? (
        <UpdateBtn onClick={handleUpdate}>수정</UpdateBtn>
      ) : (
        <DeleteBtn onClick={handleDelete}>삭제</DeleteBtn>
      )}
    </>
  );
};

// Button style
const Btn = styled.button`
  width: 130px;
  height: 53px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  font-size: 20px;
  font-weight: bold;
  letter-spacing: 0.005em;
  cursor: pointer;
`;

const UpdateBtn = styled(Btn)`
  background-color: ${({ theme }) => theme.colors.white};
  border: 2px solid ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.primary};
`;
const DeleteBtn = styled(Btn)`
  background-color: ${({ theme }) => theme.colors.white};
  border: 2px solid ${({ theme }) => theme.colors.accent};
  color: ${({ theme }) => theme.colors.accent};
`;

export default Button;
