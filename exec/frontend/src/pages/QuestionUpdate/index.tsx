/*
QuestionUpdate/index.tsx
: 원어민 첨삭 질문 수정 페이지
*/

import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import styled from 'styled-components';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import SubHeader from '../../components/SubHeader';
import Header from '../../components/Header';
import { getQuestionDetail } from '../../api/question';
import SubmitButton from './components/SubmitButton';

type Params = {
  id: string;
};

const QuestionUpdate: React.FC = () => {
  const router = useHistory();
  const params: Params = useParams();
  const MySwal = withReactContent(Swal);

  const [title, setTitle] = useState<string>('');
  const [deadLine, setDeadLine] = useState<string>('');
  const [point, setPoint] = useState<number>(0);
  const [explain, setExplain] = useState<string>('');
  const [content, setContent] = useState<string>('');

  useEffect(() => {
    // 질문 내용 불러오기
    const fetchQuestionDetail = async () => {
      const data = await getQuestionDetail(`questions/${params.id}`);

      if (data !== null) {
        setTitle(data.questionTitle);
        setDeadLine(data.questionEndDate);
        setPoint(data.questionPoint);
        setExplain(data.questionExplain);
        setContent(data.questionContents);
      }
    };
    fetchQuestionDetail();
  }, [params]);

  // Event handler
  const handleExplainChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setExplain(e.target.value.slice(0, 1000)); // 1,000자 제한
  };

  const handleCancelButton = () => {
    MySwal.fire({
      text: '정말 질문 수정을 취소하시겠습니까?',
      icon: 'question',
      confirmButtonText: '네',
      cancelButtonText: '계속 작성',
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        // 질문 조회 페이지로 분기
        router.push(`/question/${params.id}`);
      }
    });
  };

  return (
    <>
      <SubHeader />
      <Header />

      <WriteContainer>
        <PageTitle>질문 수정하기</PageTitle>
        <Form>
          <Label>
            제목
            <TextInput type="text" value={title} readOnly />
          </Label>
          <Label>
            마감일
            <DateInput type="date" value={deadLine} readOnly />
          </Label>

          <Label>
            포인트
            <PointInput value={point} readOnly />
          </Label>

          <Label>
            내용
            <TextareaInput
              rows={5}
              value={explain}
              onChange={handleExplainChange}
              placeholder="질문하고 싶은 내용을 자세히 작성해주세요"
            />
          </Label>
          <Label>
            첨삭내용
            <TextareaInput rows={10} value={content} readOnly />
          </Label>
        </Form>
        <ButtonContainer>
          <CancelButton type="button" onClick={handleCancelButton}>
            취소
          </CancelButton>
          <SubmitButton data={{ explain }} />
        </ButtonContainer>
      </WriteContainer>
    </>
  );
};

// 질문 작성 페이지 style
const WriteContainer = styled.div`
  width: 100%;
  max-width: 1600px;
  margin: auto;
  padding: 80px 133px;
`;

const PageTitle = styled.h1`
  margin-bottom: 40px;
  color: ${({ theme }) => theme.colors.black};
  font-size: ${({ theme }) => theme.fontSizes.h1};
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;
const Label = styled.label`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 30px;
  font-size: ${({ theme }) => theme.fontSizes.title};
  font-weight: bold;
`;

const TextInput = styled.input`
  width: 85%;
  padding: 10px 20px;
  font-size: ${({ theme }) => theme.fontSizes.body};
  font-weight: normal;
  border: 2px solid ${({ theme }) => theme.colors.whiteD9};
  border-radius: 8px;

  &::placehorder {
    color: ${({ theme }) => theme.colors.whiteD9};
  }
  &:focus {
    border: 2px solid ${({ theme }) => theme.colors.secondary};
    outline: none;
  }
`;
const DateInput = styled(TextInput)``;
const PointInput = styled(TextInput)``;

const TextareaInput = styled.textarea`
  width: 85%;
  padding: 15px 20px;
  font-size: ${({ theme }) => theme.fontSizes.body};
  font-weight: normal;
  border: 2px solid ${({ theme }) => theme.colors.whiteD9};
  border-radius: 8px;
  resize: none;

  &::placehorder {
    color: ${({ theme }) => theme.colors.whiteD9};
  }
  &:focus {
    border: 2px solid ${({ theme }) => theme.colors.secondary};
    outline: none;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: rows;
  justify-content: flex-end;
`;
const CancelButton = styled.button`
  width: 20%;
  height: 65px;
  margin-left: 10px;
  background-color: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.primary};
  font-size: 20px;
  font-weight: bold;
  border: 3px solid ${({ theme }) => theme.colors.primary};
  border-radius: 10px;
  cursor: pointer;
`;

export default QuestionUpdate;
