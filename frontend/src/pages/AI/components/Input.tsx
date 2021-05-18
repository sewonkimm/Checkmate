/*
AI/components/Input.tsx
: AI 첨삭 페이지 첨삭 내용 작성 컴포넌트
*/

import React, { ReactElement, useState } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import Editor from '@monaco-editor/react';

type PropsType = {
  setOriginal: (value: string) => void;
  setAnalysed: (value: boolean) => void;
};

const Input = ({ setOriginal, setAnalysed }: PropsType): ReactElement => {
  const { t } = useTranslation();
  const MySwal = withReactContent(Swal);

  const [content, setContent] = useState<string>('');
  const [contentLength, setContentLength] = useState<number>(0);

  const options = {
    acceptSuggestionOnCommitCharacter: false,
    acceptSuggestionOnEnter: 'off',
    cursorBlinking: 'blink',
    cursorSmoothCaretAnimation: false,
    cursorStyle: 'line',
    colorDecorators: false,
    fontSize: 16,
    fontLigatures: false,
    letterSpacing: 1.3,
    lineHeight: 25,
    wordWrap: 'on',
    snippetSuggestions: 'none',
  };

  const handleEditorChange = (value: any) => {
    if (value.length > 500) {
      setContent(value.slice(0, 500)); // 500자 제한
    } else {
      setContent(value);
      setContentLength(value.length);
    }
  };

  const handleSubmitButton = () => {
    if (validateContent()) {
      // 분석 api 호출 및 보여주기
      setOriginal(content);
      setAnalysed(true);
    }
  };

  const validateContent = (): boolean => {
    if (contentLength > 500) {
      MySwal.fire({
        text: '500자 이내의 글만 분석 가능합니다.',
        icon: 'warning',
        confirmButtonText: t('cancel'),
        showCancelButton: false,
      });
      return false;
    }

    if (contentLength === 0) {
      MySwal.fire({
        text: '내용을 작성해주세요!',
        icon: 'warning',
        confirmButtonText: t('cancel'),
        showCancelButton: false,
      });
      return false;
    }

    return true;
  };

  return (
    <InputContainer>
      <EditorContainer>
        <Editor
          width="100%"
          height="300px"
          defaultLanguage="markdown"
          theme="light"
          value={content}
          options={options}
          onChange={handleEditorChange}
        />
      </EditorContainer>
      <P>
        {t('ai_msg_input')} ( {contentLength} / 500 )
      </P>
      <Button onClick={handleSubmitButton}>{t('ai_button_analyze')}</Button>
    </InputContainer>
  );
};

const InputContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 100px;
`;

const EditorContainer = styled.div`
  width: 80%;
  padding: 3px;
  border: 2px solid ${({ theme }) => theme.colors.whiteD9};
  border-radius: 8px;
`;
const P = styled.p`
  width: 80%;
  margin-top: 10px;
  text-align: right;
  font-size: ${({ theme }) => theme.fontSizes.body};
  font-weight: normal;
`;

const Button = styled.button`
  width: 20%;
  height: 65px;
  margin: 50px 0 100px 0;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  font-size: 20px;
  font-weight: bold;
  border-radius: 10px;
  cursor: pointer;
  transition: all 200ms ease-in;
  &: hover {
    transform: scale(1.03, 1.03);
  }
`;

export default Input;
