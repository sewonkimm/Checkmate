import React from 'react';
import styled from 'styled-components'

const MotherLanguage: React.FC = () => {
    return(
        <Question>모국어를 선택해주세요</Question>
    )
}

const Question = styled.div`
    color: red;
  
`

export default MotherLanguage;