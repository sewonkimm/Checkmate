import React, { ReactElement } from 'react';
import styled, { keyframes } from 'styled-components';
import { useTranslation } from 'react-i18next';
import { blueAngryMan, blueSmileMan, pinkCuriousMan, pinkSmileMan, everyone } from '../../../assets';

const IntroMessenger = (): ReactElement => {
  const { t } = useTranslation();

  return (
    <>
      <MessengerWrapper>
        <FriendsTalk>
          <FriendImage src={blueAngryMan} alt="friends face" />
          <ContentsWrapper>
            <Name>{t('char_name_1')}</Name>
            <Content>{t('msg_intro_messenger_1')}</Content>
          </ContentsWrapper>
        </FriendsTalk>

        <MyTalk>
          <MyImage src={pinkCuriousMan} alt="friends face" />
          <MyContentsWrapper>
            <Name>{t('char_name_2')}</Name>
            <MyContent>{t('msg_intro_messenger_2')}</MyContent>
          </MyContentsWrapper>
        </MyTalk>

        <FriendsTalk>
          <FriendImage src={blueSmileMan} alt="friends face" />
          <ContentsWrapper>
            <Name>{t('char_name_3')}</Name>
            <Content>{t('msg_intro_messenger_3')}</Content>
          </ContentsWrapper>
        </FriendsTalk>

        <FriendsTalk>
          <FriendImage src={pinkSmileMan} alt="friends face" />
          <ContentsWrapper>
            <Name>{t('char_name_4')}</Name>
            <Content>{t('msg_intro_messenger_4')}</Content>
          </ContentsWrapper>
        </FriendsTalk>
      </MessengerWrapper>

      <ExitWrapper>
        <EveryOneImage src={everyone} alt="everyones' face" />
        <EndingMsg>{t('msg_intro_messenger_5')}</EndingMsg>
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
  padding-top: 0.1em;
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
  margin-top: 0.5em;
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
  padding-top: 0.1em;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
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
