import React, { ReactElement, useState, useEffect } from 'react';
import styled from 'styled-components';
import { MemberType } from '../../../entity';
import { getMemberInfo } from '../../../api/member';

type PropsType = {
  type: number;
  message: string;
  id: number;
};

const Message = ({ id, type, message }: PropsType): ReactElement => {
  const [memberInfo, setMemberInfo] = useState<MemberType>();

  useEffect(() => {
    const fetchMemberInfo = async () => {
      const data = await getMemberInfo(`members/${id}`);
      if (data !== null) {
        setMemberInfo(data);
      }
    };
    fetchMemberInfo();
  }, [id]);

  return (
    <>
      {/* 답변자 관점 / 아직 채택 안됨 */}
      {type === 1 && (
        <AnswerMessage>
          <Text>{message}</Text>
        </AnswerMessage>
      )}

      {/* 답변자 관점 / 채택 됨 */}
      {type === 2 && (
        <AnswerMessage>
          <Text>{message}</Text>
        </AnswerMessage>
      )}

      {/* 질문자 관점 / 아직 채택 안함 */}
      {type === 3 && (
        <QuestionMessage>
          <Text>
            {memberInfo?.memberNickname}
            {message}
          </Text>
        </QuestionMessage>
      )}
    </>
  );
};

const Container = styled.div`
  width: 100%;
  margin: auto;
  padding: 30px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-radius: 15px;
  box-shadow: 0px 5px 20px 2px rgba(48, 70, 89, 0.15);
  color: ${({ theme }) => theme.colors.white};
`;

const AnswerMessage = styled(Container)`
  background-color: ${({ theme }) => theme.colors.secondary};
`;
const QuestionMessage = styled(Container)`
  background-color: ${({ theme }) => theme.colors.accent};
`;

const Text = styled.p`
  margin: 0;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 24px;
`;

export default Message;
