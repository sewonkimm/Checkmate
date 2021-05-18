import React, { ReactElement } from 'react';
import styled, { keyframes } from 'styled-components';
import { blueAngryMan, blueSmileMan, pinkCuriousMan, pinkSmileMan, everyone } from '../../../assets';

const IntroMessenger = (): ReactElement => {
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
            <Name>궁금이</Name>
            <MyContent>체크메이트 AI 분석만 있으면 한글은 문제 없지 않아?????</MyContent>
          </MyContentsWrapper>
        </MyTalk>

        <FriendsTalk>
          <FriendImage src={blueSmileMan} alt="friends face" />
          <ContentsWrapper>
            <Name>듬직이</Name>
            <Content>
              <p>나는 AI 분석 말고, 원어민 첨삭이 더 좋더라!</p>
              <p>자연스럽잖아!</p>
            </Content>
          </ContentsWrapper>
        </FriendsTalk>

        <FriendsTalk>
          <FriendImage src={pinkSmileMan} alt="friends face" />
          <ContentsWrapper>
            <Name>흡족이</Name>
            <Content>
              <p>나는 온라인 커뮤니티에서 서로 얼굴 보면서 과제하는게</p>
              <p>그렇게 좋더라~~</p>
            </Content>
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

// style
const Show = keyframes`
    from {
        opacity: 0;
        transform: translatey(20px);
    }
    to {
        opacity: 1;
        transform: translatey(0px);
    }
`;

const MessengerWrapper = styled.div`
  width: 100%;
  padding: 80px 120px;
  background-color: #b0d3ef;
  margin: 0 auto;
`;
const FriendsTalk = styled.div`
  display: flex;
  margin-top: 0.5em;
  animation: ${Show} 1s ease-out;
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
  border-radius: 20px;
  padding: 18px;
  font-weight: 700;
  background-color: ${({ theme }) => theme.colors.white};
  margin: 0;
  text-align: left;

  p {
    margin: 5px 0 0 0;
  }
`;
const MyTalk = styled.div`
  display: flex;
  flex-direction: row-reverse;
  animation: ${Show} 1s ease-out;
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
const MyContent = styled(Content)`
  background-color: #f8e54d;
`;

const ExitWrapper = styled.div`
  width: 100%;
  background: rgb(132, 158, 179);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5em;
  margin: auto;
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
