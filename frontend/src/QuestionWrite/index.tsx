import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import NumericInput from 'react-numeric-input';
import SubHeader from '../components/SubHeader';
import Header from '../components/Header';

const QuestionWrite: React.FC = () => {
  const router = useHistory();

  const [title, setTitle] = useState<string>('');
  const [deadLine, setDeadLine] = useState<string>('');
  const [point, setPoint] = useState<number>(0);
  const [file, setFile] = useState<File | null>();
  const [content, setContent] = useState<string>('');
  const [reviewContent, setReviewContent] = useState<string>('');

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleDeadLineChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDeadLine(e.target.value);
  };

  const handlePointChange = (value: any) => {
    setPoint(value);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleReviewContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReviewContent(e.target.value);
  };

  const handleCancelButton = () => {
    router.push('/');
  };

  const handleSubmitButton = () => {
    console.log('제출');
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
            <FileLabel>
              파일 추가
              <FileInput type="file" accept="image/*,.pdf,.doc,.docx,.xls,.xlsx" onChange={handleFileChange} />
            </FileLabel>
          </PointFileDiv>

          <Label>
            내용
            <TextareaInput
              rows={5}
              value={content}
              onChange={handleContentChange}
              placeholder="질문하고 싶은 내용을 자세히 작성해주세요"
            />
          </Label>
          <Label>
            첨삭내용
            <TextareaInput
              rows={10}
              value={reviewContent}
              onChange={handleReviewContentChange}
              placeholder="첨삭 받을 내용을 1,000자 이내로 작성해주세요"
            />
          </Label>
        </Form>

        <ButtonContainer>
          <CancelButton type="button" onClick={handleCancelButton}>
            취소
          </CancelButton>
          <SubmitButton type="button" onClick={handleSubmitButton}>
            등록
          </SubmitButton>
        </ButtonContainer>
      </WriteContainer>
    </>
  );
};

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
const SubmitButton = styled.button`
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
const CancelButton = styled(SubmitButton)`
  background-color: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.primary};
  border: 3px solid ${({ theme }) => theme.colors.primary};
`;

export default QuestionWrite;
