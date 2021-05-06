// member
export type MemberType = {
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
  member: MemberType;
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

export interface ResponseQuestionType extends QuestionType {
  questionDate: string;
  questionId: number;
  questionStatus: number;
}
export type QuestionResponseType = {
  answerCount: number;
  question: ResponseQuestionType;
};
