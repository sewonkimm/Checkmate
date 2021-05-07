import React, { ReactElement, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { MemberType, AnswerType } from '../../../entity';
import { getMemberInfo } from '../../../api/member';
import { WriteAPI } from '../../../api/answer';

type PropsType = {
  id: number;
  setIsAnswerd: (value: boolean) => void;
};

type Params = {
  id: string;
};

const WriteAnswer = ({ id, setIsAnswerd }: PropsType): ReactElement => {
  const params: Params = useParams();

  const [memberInfo, setMemberInfo] = useState<MemberType>();
  const [showWriteInput, setShowWriteInput] = useState<boolean>(false);
  const [explain, setExplain] = useState<string>('');
  const [content, setContent] = useState<string>('');

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
            setIsAnswerd(true);
          }
        });
      } else {
        // 제출 실패
        MySwal.fire({
          text: '업로드에 실패했습니다.',
          icon: 'error',
        });
      }
    } else {
      MySwal.fire({
        text: '첨삭 내용을 입력해주세요!',
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
              설명
              <TextareaInput
                rows={5}
                value={explain}
                onChange={handleExplainChange}
                placeholder="답변에 대한 설명을 작성해주세요"
              />
            </Label>
            <Label>
              첨삭내용
              <TextareaInput
                rows={5}
                value={content}
                onChange={handleContentChange}
                placeholder="첨삭 내용을 1,000자 이내로 작성해주세요"
              />
            </Label>
          </Form>
          <SubmitButton onClick={handleSubmitButton}>답변 등록</SubmitButton>
        </WriteContainer>
      ) : (
        <WriteButtonContainer>
          <MessageContainer>
            <Message>{memberInfo?.memberNickname} 메이트님, 답변을 작성해주세요!</Message>
            <SubMessage>답변을 작성해주시면 기본 10포인트를 드리고, 채택되면 추가 포인트가 지급됩니다.</SubMessage>
          </MessageContainer>

          <Button onClick={handleShowButton}>답변 작성하기</Button>
        </WriteButtonContainer>
      )}
    </>
  );
};

const WriteContainer = styled.div`
  max-width: 985px;
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

const WriteButtonContainer = styled.div`
  max-width: 985px;
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
  height: 47px;
  padding: 0 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  font-size: ${({ theme }) => theme.fontSizes.body};
  font-weight: bold;
  cursor: pointer;
  background-color: ${({ theme }) => theme.colors.white};
  border: 2px solid ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.primary};
`;

const SubmitButton = styled.button`
  width: 20%;
  height: 65px;
  margin-left: 10px;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  font-size: 20px;
  font-weight: bold;
  border-radius: 20px;
  cursor: pointer;
`;

export default WriteAnswer;
