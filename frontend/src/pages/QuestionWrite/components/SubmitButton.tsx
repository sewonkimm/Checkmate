/*
QuestionWrite/components/SubmiButton.tsx
: 원어민 첨삭 질문 작성 페이지의 작성 버튼
*/

import React, { ReactElement, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { RootState } from '../../../modules';
import { WriteAPI, FileUploadAPI } from '../../../api/question';
import { RequestQuestionType } from '../../../entity';

type PropsType = {
  data: {
    title: string;
    explain: string;
    content: string;
    deadLine: string;
    point: number;
    file: File | null | undefined;
  };
};

const SubmitButton = (props: PropsType): ReactElement => {
  const { t } = useTranslation();
  const router = useHistory();
  const MySwal = withReactContent(Swal);

  const [memberId] = useState<number>(useSelector((state: RootState) => state.member.member.memberId));

  // Form 제출 유효성 검사 : 하나라도 안 쓴 것이 있으면 제출이 안됨
  const validateSubmit = (): boolean => {
    if (props.data.title === '') return false;
    if (props.data.point === 0 && props.data.content === '') return false;
    if (props.data.point > 0 && props.data.file === undefined && props.data.content === '') return false;
    return true;
  };

  // 질문 작성 API 호출
  const handleSubmitButton = async () => {
    if (validateSubmit()) {
      let data: RequestQuestionType = {
        // 파일첨부 X
        memberId,
        questionContents: props.data.content,
        questionEndDate: props.data.deadLine,
        questionExplain: props.data.explain,
        questionPoint: props.data.point,
        questionTitle: props.data.title,
      };

      if (props.data.point > 0 && props.data.file !== null && props.data.file !== undefined) {
        // 파일첨부 한 경우 -> 파일 업로드 API 호출
        const response = await FileUploadAPI(props.data.file);
        if (response !== 500 && typeof response !== 'number') {
          data = {
            ...data,
            questionUrl: response,
          };
        }
      }

      const response = await WriteAPI(data);
      if (response === 200) {
        // 제출 성공 시, 질문 목록 조회 페이지로 분기
        MySwal.fire({
          text: t('write_msg_success'),
          icon: 'success',
        }).then((result: any) => {
          if (result.isConfirmed) {
            router.push('/check/mate');
          }
        });
      } else {
        // 제출 실패
        toast.error(t('write_msg_error'), {
          position: 'bottom-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } else {
      MySwal.fire({
        text: t('write_msg_warning'),
        icon: 'warning',
      });
    }
  };

  return (
    <>
      <Button type="button" onClick={handleSubmitButton}>
        {t('list_button_write')}
      </Button>

      <StyledToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
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

const StyledToastContainer = styled(ToastContainer)`
  width: 25vw;
  font-size: 20px;
`;

export default SubmitButton;
