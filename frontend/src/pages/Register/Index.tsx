/*
Register/Index.tsx
: 회원가입 페이지
*/

import React, { useState } from 'react';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { signupIconNormal } from '../../assets';
import MotherLanguage from './components/MotherLanguage';
import InputEmail from './components/InputEmail';
import InputNickname from './components/InputNickname';
import InputPassword from './components/InputPassword';
import register from '../../api/register';

const Register: React.FC = () => {
  const { t } = useTranslation();
  const history = useHistory();

  const [step, setStep] = useState<number>(0); // 몇 번째 컴포넌트가 보여질지 정해주는 state
  const [selectedLanguage, setSelectedLanguage] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [nickname, setNickname] = useState<string>('');
  const [canRegister, setCanRegister] = useState<boolean>(false);
  const [ableNextBtn, setAbleNextBtn] = useState<boolean>(false);
  const [nextBtnText, setNextBtnText] = useState<string>(t('register_button_next'));

  const handleNextBtn = async () => {
    if (step >= 0 && step < registerGroup.length) {
      setStep(step + 1); // 다음 컴포넌트 표시
      setAbleNextBtn(false); // NextBtn 비활성화

      if (step === 2) {
        setNextBtnText(t('register_button_login')); // 버튼 문구 변경
      }

      // 조건을 다 만족하면 회원가입 api 호출
      if (step >= 3 && email && password && nickname) {
        // 회원가입 시 전달할 데이터
        const credentials = {
          memberEmail: email,
          memberId: 0,
          memberIntroduce: '',
          memberNativeLang: selectedLanguage,
          memberNickname: nickname,
          memberPassword: password,
          memberPoint: 0,
          memberProfileUrl: '',
          memberTypeId: 0,
          memberGrade: 0,
        };

        // axios 회원가입 요청
        const response = await register.registerAPI(credentials);

        // response
        if (response === -1) {
          alert(t('register_msg_error')); // 추후 토스트 메세지로 변경
        } else {
          setCanRegister(true);
          setNextBtnText(t('register_button_login'));
        }
      } else if (step >= 3 && !(email && password && nickname)) {
        // 추후 토스트 메세지 추가
      }
    }
  };

  const handleLoginBtn = () => {
    history.push('/login');
  };

  const putLang = (language: string) => {
    setSelectedLanguage(language);
    setAbleNextBtn(true); // NextBtn 활성화
  };
  const putEmail = (emailValue: string) => {
    setEmail(emailValue);
    setAbleNextBtn(true); // NextBtn 활성화
  };
  const putPassword = (passwordValue: string) => {
    setPassword(passwordValue);
    setAbleNextBtn(true); // NextBtn 활성화
  };
  const putNickname = (name: string) => {
    setNickname(name);
    setAbleNextBtn(true); // NextBtn 활성화
  };

  // 단계별로 보여질 컴포넌트 배열
  const registerGroup: Array<JSX.Element> = [
    <MotherLanguage putLang={putLang} />,
    <InputEmail putEmail={putEmail} preventNext={setAbleNextBtn} />,
    <InputPassword putPassword={putPassword} preventNext={setAbleNextBtn} />,
    <InputNickname putNickname={putNickname} preventNext={setAbleNextBtn} />,
  ];

  return (
    <RegisterWrap>
      <section>
        <Title>Sign Up</Title>
        <Icon src={signupIconNormal} alt="signup-logo" />
      </section>

      {canRegister ? (
        <>
          <Message>{t('register_msg_welcome')}</Message>
          <ButtonWrap>
            <NextBtn onClick={handleLoginBtn}>{nextBtnText}</NextBtn>
          </ButtonWrap>
        </>
      ) : (
        <>
          <SignupBody>
            <Steps>
              {step + 1} / {registerGroup.length}
            </Steps>
            {registerGroup[step]}
          </SignupBody>

          <ButtonWrap>
            <NextBtn onClick={handleNextBtn} disabled={!ableNextBtn}>
              {nextBtnText}
            </NextBtn>
          </ButtonWrap>
        </>
      )}
    </RegisterWrap>
  );
};

// Register page style
const RegisterWrap = styled.section`
  width: 100%;
  height: 100vh;
  overflow: scroll;
  padding: 100px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
`;

const Title = styled.h1`
  margin: 0 0 20px 0;
  font-family: 'Kirang Haerang', cursive;
  font-size: 72px;
  font-weight: normal;
`;
const Icon = styled.img`
  width: 14.875rem;
  height: auto;
`;

const SignupBody = styled.section`
  margin-top: 60px;
  width: 473px;
`;
const Steps = styled.p`
  margin-bottom: 5px;
  font-size: ${({ theme }) => theme.fontSizes.title};
`;

const ButtonWrap = styled.div`
  width: 473px;
  display: flex;
  justify-content: space-around;
`;
const NextBtn = styled.button`
  width: 100%;
  height: 65px;
  border-radius: 10px;
  font-size: 20px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primary};
  background-color: ${({ theme }) => theme.colors.white};
  &:hover {
    cursor: pointer;
  }
  &:disabled {
    color: ${({ theme }) => theme.colors.whiteD9};
    background-color: ${({ theme }) => theme.colors.whiteF7};
  }
`;

const Message = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.h3};
`;

export default Register;
