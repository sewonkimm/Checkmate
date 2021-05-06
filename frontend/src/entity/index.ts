// member
export type LoginMemberType = {
  memberEmail: string;
  memberId: number;
  memberIntroduce: string;
  memberNativeLang: string;
  memberNickname: string;
  memberPassword: string;
  memberPoint: number;
  memberProfileUrl: string;
  memberTypeId: number;
};
export type LoginReturnType = {
  greeting: string;
  member: LoginMemberType;
};

export type MemberType = {
  memberEmail: string;
  memberId: number;
  memberIntroduce: string;
  memberNativeLang: string;
  memberNickname: string;
  memberPoint: number;
  memberProfileUrl: string;
  memberTypeId: number;
};

// question
export interface QuestionType {
  memberId: number;
  questionContents: string;
  questionEndDate: string;
  questionExplain: string;
  questionPoint: number;
  questionTitle: string;
  questionUrl?: string;
}

export interface QuestionResponseType extends QuestionType {
  questionDate: string;
  questionId: number;
  questionStatus: number;
}

// answer
export type AnswerType = {
  answerId: number;
  memberId: number;
  questionId: number;
  answerContents: string;
  answerExplain: string;
  answerDate: string;
  answerModifiedDate: string | null;
  answerSelect: number;
  answerUrl: string;
};

export type AnswerResponseType = {
  totalSize: number;
  list: AnswerType[] | null;
};
