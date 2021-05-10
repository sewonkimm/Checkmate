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
export interface RequestQuestionType {
  memberId: number;
  questionContents: string;
  questionEndDate: string;
  questionExplain: string;
  questionPoint: number;
  questionTitle: string;
  questionUrl?: string;
}

export interface QuestionType extends RequestQuestionType {
  questionDate: string;
  questionId: number;
  questionStatus: number;
}

export type ResponseQuestionType = {
  answerCount: number;
  question: QuestionType;
};

export type ResponseMyQuestionListType = {
  answerCount: number;
  question: {
    memberId: number;
    questionContents: string;
    questionDate?: string;
    questionEndDate?: string;
    questionExplain?: string;
    questionId: number;
    questionPoint: number;
    questionStatus: number;
    questionTitle: string;
    questionUrl: string;
  };
};

export type ResponseUserQuestionType = {
  answerTotal: number;
  list: ResponseMyQuestionListType[];
  totalSize: number;
};

// answer
export type AnswerType = {
  answerId?: number;
  memberId: number;
  questionId: number;
  answerContents: string;
  answerExplain: string;
  answerDate?: string;
  answerModifiedDate?: string;
  answerSelect: number;
  answerUrl?: string;
};

export type ResponseAnswerType = {
  totalSize: number;
  list: AnswerType[] | null;
};

// review
export type ReviewType = {
  answerId: number;
  reviewCategory: number;
  reviewContents: string;
  reviewScore: number;
};

export type ResponseMyReview = {
  totalSize: number;
  reviewList: ReviewType[];
};
