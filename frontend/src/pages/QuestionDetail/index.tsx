import React from 'react';
import { useParams } from 'react-router-dom';

type Params = {
  id: string;
};
const QuestionDetail: React.FC = () => {
  const params: Params = useParams();
  const { id } = params;

  return <>Question {id} Detail</>;
};

export default QuestionDetail;
