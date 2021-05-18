import React, { ReactElement, useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { MemberType, AnswerType } from '../../../entity';
import { getMemberInfo } from '../../../api/member';
import { WriteAPI } from '../../../api/answer';

type PropsType = {
  id: number;
  questionContents: string;
};

type Params = {
  id: string;
};

const WriteAnswer = (props: PropsType): ReactElement => {
  const { t } = useTranslation();
  const router = useHistory();
  const params: Params = useParams();
  const { id, questionContents } = props;

  const [memberInfo, setMemberInfo] = useState<MemberType>();
  const [showWriteInput, setShowWriteInput] = useState<boolean>(false);
  const [explain, setExplain] = useState<string>('');
  const [content, setContent] = useState<string>(questionContents);

  useEffect(() => {
    const fetchMemberInfo = async () => {
      const data = await getMemberInfo(`members/${id}`);
      if (data !== null) {
        setMemberInfo(data);
      }
    };
    fetchMemberInfo();
  }, [id]);

  // Event handler
  const handleShowButton = () => {
    setShowWriteInput(true);
  };

  const handleExplainChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setExplain(e.target.value.slice(0, 1000)); // 1,000자 제한
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value.slice(0, 1000)); // 1,000자 제한
  };

  // 답변 작성 API 호출
  const MySwal = withReactContent(Swal);
  const handleSubmitButton = async () => {
    if (validateSubmit() && memberInfo?.memberId !== undefined) {
      const data: AnswerType = {
        memberId: id,
        questionId: parseInt(params.id, 10),
        answerContents: content,
        answerExplain: explain,
        answerSelect: 0,
      };

      const response = await WriteAPI(data);
      if (response === 200) {
        // 제출 성공 시, 질문 목록 조회 페이지로 분기
        MySwal.fire({
          text: '감사합니다',
          icon: 'success',
        }).then((result) => {
          if (result.isConfirmed) {
            setShowWriteInput(false);
            router.go(0);
          }
        });
      } else {
        // 제출 실패
        MySwal.fire({
          text: t('write_msg_error'),
          icon: 'error',
        });
      }
    } else {
      MySwal.fire({
        text: t('answer_msg_warning'),
        icon: 'warning',
      });
    }
  };

  // Form 제출 유효성 검사
  const validateSubmit = (): boolean => {
    if (content === '') return false;
    return true;
  };

  return (
    <>
      {showWriteInput ? (
        <WriteContainer>
          <Form>
            <Label>
              {t('write_label_explain')}
              <TextareaInput
                rows={5}
                value={explain}
                onChange={handleExplainChange}
                placeholder={t('answer_placeholder_explain')}
              />
            </Label>
            <Label>
              {t('content')}
              <TextareaInput
                rows={10}
                value={content}
                onChange={handleContentChange}
                placeholder={t('answer_placeholder_content')}
              />
            </Label>
          </Form>
          <SubmitButton onClick={handleSubmitButton}>{t('detail_button_answer')}</SubmitButton>
        </WriteContainer>
      ) : (
        <WriteButtonContainer>
          <MessageContainer>
            <Message>
              {memberInfo?.memberNickname}
              {t('detail_msg_answer')}
            </Message>
            <SubMessage>{t('detail_msg_answer_desc')}</SubMessage>
          </MessageContainer>

          <Button onClick={handleShowButton}>{t('detail_button_answer')}</Button>
        </WriteButtonContainer>
      )}
    </>
  );
};

const WriteContainer = styled.div`
  width: 100%;
  margin: auto;
  padding: 30px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  background-color: ${({ theme }) => theme.colors.secondary};
  border-radius: 15px;
  box-shadow: 0px 5px 20px 2px rgba(48, 70, 89, 0.15);
`;

const Form = styled.form`
  width: 100%;
`;
const Label = styled.label`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 30px;
  font-size: ${({ theme }) => theme.fontSizes.title};
  font-weight: bold;
  color: ${({ theme }) => theme.colors.white};
`;

const TextareaInput = styled.textarea`
  width: 705px;
  padding: 15px 20px;
  font-size: ${({ theme }) => theme.fontSizes.body};
  font-weight: normal;
  line-height: 30px;
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

const WriteButtonContainer = styled.div`
  width: 100%;
  margin: auto;
  padding: 30px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.colors.secondary};
  border-radius: 15px;
  box-shadow: 0px 5px 20px 2px rgba(48, 70, 89, 0.15);
  color: ${({ theme }) => theme.colors.white};
`;

const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;
const Message = styled.h3`
  margin: 0;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 24px;
`;
const SubMessage = styled.p`
  margin: 0;
  font-weight: normal;
  font-size: 14px;
  line-height: 21px;
`;

const Button = styled.button`
  hegith: 56px;
  padding: 10px 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
  font-size: ${({ theme }) => theme.fontSizes.body};
  font-weight: bold;
  cursor: pointer;
  background-color: ${({ theme }) => theme.colors.white};
  border: 2px solid ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.primary};
`;

const SubmitButton = styled.button`
  hegith: 60px;
  margin-left: 10px;
  padding: 15px 35px;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  font-size: 20px;
  font-weight: bold;
  font-size: ${({ theme }) => theme.fontSizes.body};
  cursor: pointer;
  border-radius: 15px;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.accent};
  }
`;

export default WriteAnswer;
