/*
QuestionUpdate/components/SubmiButton.tsx
: 원어민 첨삭 질문 수정 페이지의 수정 버튼
*/

import React, { ReactElement } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import styled from 'styled-components';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { UpdateAPI } from '../../../api/question';

type PropsType = {
  data: {
    explain: string;
  };
};

type Params = {
  id: string;
};

const SubmitButton = (props: PropsType): ReactElement => {
  const router = useHistory();
  const params: Params = useParams();
  const MySwal = withReactContent(Swal);

  // 질문 작성 API 호출
  const handleSubmitButton = async () => {
    const data = {
      questionExplain: props.data.explain,
      questionId: parseInt(params.id, 10),
    };

    const response = await UpdateAPI(data);
    if (response === 200) {
      // 제출 성공 시, 질문 목록 조회 페이지로 분기
      MySwal.fire({
        text: '수정에 성공했습니다!',
        icon: 'success',
      }).then((result) => {
        if (result.isConfirmed) {
          router.push(`/question/${params.id}`);
        }
      });
    } else {
      // 제출 실패
      MySwal.fire({
        text: '문제가 있어 수정에 실패했습니다.',
        icon: 'error',
      });
    }
  };

  return (
    <Button type="button" onClick={handleSubmitButton}>
      등록
    </Button>
  );
};

// Submit Button style
const Button = styled.button`
  width: 20%;
  height: 65px;
  margin-left: 10px;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  font-size: 20px;
  font-weight: bold;
  border-radius: 10px;
  cursor: pointer;
`;

export default SubmitButton;
