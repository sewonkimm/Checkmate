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
// 응답 데이터 형태가 바뀌었기 때문에 타입을 그에 따라 수정했습니다.
export type QuestionResponseType = {
  answerCount: number;
  question: ResponseQuestionType;
};
