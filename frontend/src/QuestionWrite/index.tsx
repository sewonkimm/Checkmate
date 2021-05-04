/*
QuestionWrite/index.tsx
: 원어민 첨삭 질문 작성 페이지
*/

import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import NumericInput from 'react-numeric-input';
import SubHeader from '../components/SubHeader';
import Header from '../components/Header';
import SubmitButton from './components/SubmitButton';

const QuestionWrite: React.FC = () => {
  const router = useHistory();

  const [title, setTitle] = useState<string>('');
  const [today, setToday] = useState<string>('');
  const [deadLine, setDeadLine] = useState<string>('');
  const [point, setPoint] = useState<number>(0);
  const [file, setFile] = useState<File | null>();
  const [explain, setExplain] = useState<string>('');
  const [content, setContent] = useState<string>('');

  useEffect(() => {
    // 오늘 날짜 설정
    const date = new Date();
    const year = date.getFullYear();
    const month = `0${1 + date.getMonth()}`.slice(-2);
    const day = `0${date.getDate()}`.slice(-2);
    setToday(`${year}-${month}-${day}`);
    setDeadLine(`${year}-${month}-${day}`);
  }, []);

  useEffect(() => {
    // 오늘을 포함한 미래의 날짜만 마감일로 설정 가능
    if (deadLine < today) {
      setDeadLine(today);
    }
  }, [today, deadLine]);

  // Event handler
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleDeadLineChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDeadLine(e.target.value);
  };

  const handlePointChange = (value: any) => {
    if (value === 0) {
      setFile(undefined);
    }
    setPoint(value);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleExplainChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setExplain(e.target.value.slice(0, 1000)); // 1,000자 제한
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value.slice(0, 1000)); // 1,000자 제한
  };

  const handleCancelButton = () => {
    // 정말 취소하겠냐는 alert 추가하기
    router.push('/');
  };

  return (
    <>
      <SubHeader />
      <Header />

      <WriteContainer>
        <PageTitle>질문하기</PageTitle>
        <Form>
          <Label>
            제목
            <TextInput type="text" value={title} onChange={handleTitleChange} placeholder="제목을 작성해주세요" />
          </Label>
          <Label>
            마감일
            <DateInput type="date" value={deadLine} onChange={handleDeadLineChange} />
          </Label>

          <PointFileDiv>
            <Label>
              포인트
              <NumericInput
                min={0}
                step={100}
                value={point}
                onChange={handlePointChange}
                style={{
                  wrap: { width: '80%' },
                  input: {
                    width: '100%',
                    height: '40px',
                    padding: 20,
                    fontSize: 18,
                  },
                }}
              />
            </Label>
            {point > 0 ? (
              <FileLabel>
                파일 추가
                <FileInput type="file" accept="image/*,.pdf,.doc,.docx,.xls,.xlsx" onChange={handleFileChange} />
              </FileLabel>
            ) : (
              <FileLabel style={{ color: '#D9D9D9', border: '2px solid #D9D9D9' }}>
                파일 추가
                <FileInput disabled />
              </FileLabel>
            )}
          </PointFileDiv>

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
            <TextareaInput
              rows={10}
              value={content}
              onChange={handleContentChange}
              placeholder="첨삭 받을 내용을 1,000자 이내로 작성해주세요"
            />
          </Label>
        </Form>
        <ButtonContainer>
          <CancelButton type="button" onClick={handleCancelButton}>
            취소
          </CancelButton>
          <SubmitButton data={{ title, explain, content, deadLine, point, file }} />
        </ButtonContainer>
      </WriteContainer>
    </>
  );
};

// 질문 작성 페이지 style
const WriteContainer = styled.div`
  width: 100%;
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

const FileLabel = styled.label`
  height: 40px;
  margin-left: 10px;
  padding: 5px;
  text-align: center;
  color: ${({ theme }) => theme.colors.primary};
  font-size: 20px;
  font-weight: bold;
  vertical-align: middle;
  background-color: ${({ theme }) => theme.colors.white};
  border: 2px solid ${({ theme }) => theme.colors.primary};
  border-radius: 10px;
  cursor: pointer;
`;
const FileInput = styled.input`
  /* 파일 필드 숨기기 */
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
`;

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

const PointFileDiv = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
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

export default QuestionWrite;
