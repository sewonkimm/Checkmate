import React, { useState } from 'react';
import styled from 'styled-components';
import NumericInput from 'react-numeric-input';
import SubHeader from '../components/SubHeader';
import Header from '../components/Header';

const QuestionWrite: React.FC = () => {
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

  const handleOnSubmit = () => {
    console.log('제출');
  };

  return (
    <>
      <SubHeader />
      <Header />

      <WriteContainer>
        <PageTitle>질문하기</PageTitle>

        <Form onSubmit={handleOnSubmit}>
          <label>
            제목
            <input type="text" value={title} onChange={handleTitleChange} />
          </label>
          <label>
            마감일
            <input type="date" value={deadLine} onChange={handleDeadLineChange} />
          </label>
          <label>
            포인트
            <NumericInput min={0} step={100} value={point} onChange={handlePointChange} />
          </label>
          <input type="file" accept="image/*,.pdf,.doc,.docx,.xls,.xlsx" onChange={handleFileChange} />
          <label>
            내용
            <textarea value={content} onChange={handleContentChange} />
          </label>
          <label>
            첨삭내용
            <textarea value={reviewContent} onChange={handleReviewContentChange} />
          </label>
          <input type="submit" value="submit" />
        </Form>
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

export default QuestionWrite;
