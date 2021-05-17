import React from 'react';
import styled from 'styled-components';
import { blueAngryMan, blueSmileMan, pinkCuriousMan, pinkSmileMan, everyone } from '../../../assets';

const IntroMessenger = () => {
  return (
    <>
      <MessengerWrapper>
        <FriendsTalk>
          <FriendImage src={blueAngryMan} alt="friends face" />
          <ContentsWrapper>
            <Name>짜증이</Name>
            <Content>과제 이해하기도 벅찬데 맨날 한글 때문에 감점당해 ㅠㅠ</Content>
          </ContentsWrapper>
        </FriendsTalk>
        <MyTalk>
          <MyImage src={pinkCuriousMan} alt="friends face" />
          <MyContentsWrapper>
            <MyName>궁금이</MyName>
            <MyContent>과제 이해하기도 벅찬데 맨날 한글 때문에 감점당해 ㅠㅠ</MyContent>
          </MyContentsWrapper>
        </MyTalk>
        <FriendsTalk>
          <FriendImage src={blueSmileMan} alt="friends face" />
          <ContentsWrapper>
            <Name>듬직이</Name>
            <Content>나는 AI 분석 말고, 원어민 첨삭이 더 좋더라! 자연스럽잖아!</Content>
          </ContentsWrapper>
        </FriendsTalk>
        <FriendsTalk>
          <FriendImage src={pinkSmileMan} alt="friends face" />
          <ContentsWrapper>
            <Name>흡족이</Name>
            <Content>나는 온라인 광장에서 서로 얼굴 보면서 과제하는게 그렇게 좋더라~~</Content>
          </ContentsWrapper>
        </FriendsTalk>
      </MessengerWrapper>
      <ExitWrapper>
        <EveryOneImage src={everyone} alt="everyones' face" />
        <EndingMsg>
          체크메이트로 한국어 과제 걱정 끝! <br />
          우리 체크메이트에서 만나요
        </EndingMsg>
      </ExitWrapper>
    </>
  );
};

const MessengerWrapper = styled.div`
  padding: 80px;
  background-color: #b0d3ef;
  max-width: 1200px;
  margin: auto;
`;
const FriendsTalk = styled.div`
  display: flex;
  margin-top: 0.5em;
`;
const FriendImage = styled.img`
  display: block;
  width: 150px;
  height: 150px;
  margin-right: 0.5em;
`;
const ContentsWrapper = styled.div`
  padding-top: 0.4em;
`;
const Name = styled.p`
  font-size: 16px;
  text-align: start;
  font-weight: 600;
  color: gray;
`;
const Content = styled.p`
  font-size: 20px;
  border: 1px solid ${({ theme }) => theme.colors.white};
  border-radius: 20px;
  padding: 18px;
  font-weight: 700;
  background-color: ${({ theme }) => theme.colors.white};
  margin: 0;
`;
const MyTalk = styled.div`
  display: flex;
  flex-direction: row-reverse;
`;
const MyImage = styled.img`
  display: block;
  width: 150px;
  height: 150px;
  margin-left: 0.5em;
`;
const MyContentsWrapper = styled.div`
  padding-top: 0.4em;
`;
const MyName = styled.p`
  font-size: 16px;
  text-align: end;
  font-weight: 600;
  color: gray;
`;
const MyContent = styled.p`
  font-size: 20px;
  border: 1px solid ${({ theme }) => theme.colors.white};
  border-radius: 20px;
  padding: 18px;
  font-weight: 700;
  background-color: ${({ theme }) => theme.colors.white};
  margin: 0;
`;
const ExitWrapper = styled.div`
  background: rgb(132, 158, 179);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5em;
  margin: auto;
  margin-bottom: 1em;
  max-width: 1200px;
`;
const EveryOneImage = styled.img`
  width: 150px;
  height: 150px;
  display: block;
  margin-right: 1em;
`;
const EndingMsg = styled.p`
  font-size: 20px;
  font-weight: 700;
`;
export default IntroMessenger;
