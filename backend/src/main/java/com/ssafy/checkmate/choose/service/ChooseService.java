package com.ssafy.checkmate.choose.service;

import com.ssafy.checkmate.answer.dto.Answer;
import com.ssafy.checkmate.answer.repository.AnswerRepository;
import com.ssafy.checkmate.member.dto.Member;
import com.ssafy.checkmate.member.repository.MemberRepository;
import com.ssafy.checkmate.question.dto.Question;
import com.ssafy.checkmate.question.repository.QuestionRepository;
import com.ssafy.checkmate.review.dto.Review;
import com.ssafy.checkmate.review.service.ReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class ChooseService {

    private final AnswerRepository answerRepository;
    private final ReviewService reviewService;
    private final MemberRepository memberRepository;
    private final QuestionRepository questionRepository;

    @Transactional
    public void chooseAnswer(Long questionId, Long answerId, Review review) {

        Answer answer = answerRepository.findAnswerByAnswerId(answerId);
        answer.setAnswerSelect(1);

        Member member = memberRepository.findMemberByMemberId(answer.getMemberId());

        Question question = questionRepository.findQuestionByQuestionId(questionId);

        member.setMemberPoint(member.getMemberPoint() + question.getQuestionPoint());

        answerRepository.save(answer);
        reviewService.insertReview(review);
        memberRepository.save(member);
    }
}
