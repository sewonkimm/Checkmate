/*
QuestionWrite/components/SubmiButton.tsx
: 원어민 첨삭 질문 작성 페이지의 작성 버튼
*/

import React, { ReactElement, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { RootState } from '../../modules';
import { WriteAPI, FileUploadAPI } from '../../api/question';
import { QuestionType } from '../../entity';

type PropsType = {
  props: {
    title: string;
    explain: string;
    content: string;
    deadLine: string;
    point: number;
    file: File | null | undefined;
  };
};

const SubmitButton = (props: PropsType): ReactElement => {
  const router = useHistory();
  const [memberId, setMemberId] = useState<number>(useSelector((state: RootState) => state.member.member.memberId));

  // Form 제출 유효성 검사 : 하나라도 안 쓴 것이 있으면 제출이 안됨
  const validateSubmit = (): boolean => {
    if (props.props.title === '') return false;
    if (props.props.point === 0 && props.props.content === '') return false;
    if (props.props.point > 0 && props.props.file === undefined && props.props.content === '') return false;
    return true;
  };

  // 질문 작성 API 호출
  const handleSubmitButton = async () => {
    if (validateSubmit()) {
      let data: QuestionType = {
        // 파일첨부 X
        memberId,
        questionContents: props.props.content,
        questionEndDate: props.props.deadLine,
        questionExplain: props.props.explain,
        questionPoint: props.props.point,
        questionTitle: props.props.title,
        questionUrl: '',
      };

      if (props.props.point > 0 && props.props.file !== null && props.props.file !== undefined) {
        // 파일첨부 한 경우 -> 파일 업로드 API 호출
        const response = await FileUploadAPI(props.props.file);
        if (response !== 500) {
          data = {
            ...data,
            questionUrl: response,
          };
        }
      }

      const response = await WriteAPI(data);
      if (response === 200) {
        // 제출 성공 시, 질문 목록 조회 페이지로 분기
        router.push('/check/mate');
      } else {
        // 제출 실패
      }
    } else {
      // 항목을 모두 입력해주세요 알림!
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
