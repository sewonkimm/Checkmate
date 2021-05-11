package com.ssafy.checkmate.choose.service;

import com.ssafy.checkmate.answer.dto.Answer;
import com.ssafy.checkmate.answer.repository.AnswerRepository;
import com.ssafy.checkmate.member.dto.Member;
import com.ssafy.checkmate.member.repository.MemberRepository;
import com.ssafy.checkmate.question.dto.Question;
import com.ssafy.checkmate.question.repository.QuestionRepository;
import com.ssafy.checkmate.review.dto.Review;
import com.ssafy.checkmate.review.repository.ReviewRepository;
import com.ssafy.checkmate.review.service.ReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ChooseService {

    private final AnswerRepository answerRepository;
    private final ReviewService reviewService;
    private final MemberRepository memberRepository;
    private final QuestionRepository questionRepository;
    private final ReviewRepository reviewRepository;

    @Transactional
    public void chooseAnswer(Long questionId, Long answerId, Review review) {

        Answer answer = answerRepository.findAnswerByAnswerId(answerId);
        answer.setAnswerSelect(1);

        Member member = memberRepository.findMemberByMemberId(answer.getMemberId());

        Question question = questionRepository.findQuestionByQuestionId(questionId);
        question.setQuestionStatus(1);

        member.setMemberPoint(member.getMemberPoint() + question.getQuestionPoint());

        answerRepository.save(answer);
        reviewService.insertReview(review);
        questionRepository.save(question);
        memberRepository.save(member);
    }

    public void calculateGrade(Long answerId, Review review) {

        Answer answer = answerRepository.findAnswerByAnswerId(answerId);
        Member member = memberRepository.findMemberByMemberId(answer.getMemberId());
        List<Answer> answerList = answerRepository.findAnswerByMemberId(member.getMemberId());

        double reviewCount = 0.0;
        double sumGrade = 0.0;
        double avgGrade = 0.0;
        double n = Math.pow(10.0, 1);

        for (Answer ans : answerList) {

            if (reviewRepository.existsByAnswerId(ans.getAnswerId())) {
                Review rv = reviewRepository.findReviewByAnswerId(ans.getAnswerId());

                sumGrade = sumGrade + rv.getReviewScore();
                reviewCount++;
            }
        }

        avgGrade = Math.round((sumGrade / reviewCount) * n) / n;

        member.setMemberGrade(avgGrade);
        memberRepository.save(member);
    }
}
