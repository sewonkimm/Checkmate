/* eslint-disable react/destructuring-assignment */
import React, { ReactElement } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const UpdateButton = (props: { id: number }): ReactElement => {
  const router = useHistory();
  const MySwal = withReactContent(Swal);

  const handleUpdate = () => {
    MySwal.fire({
      text: '내용을 수정하시겠습니까?',
      icon: 'question',
      confirmButtonText: '수정',
      cancelButtonText: '취소',
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        // 질문 수정 페이지로 분기
        router.push(`/question/update/${props.id}`);
      }
    });
  };

  return <Button onClick={handleUpdate}>수정</Button>;
};

// Button style
const Button = styled.button`
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
  background-color: ${({ theme }) => theme.colors.white};
  border: 2px solid ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.primary};
`;

export default UpdateButton;
