package com.ssafy.checkmate.question.service;

import com.ssafy.checkmate.question.dto.Question;
import com.ssafy.checkmate.question.repository.QuestionRepository;
import com.ssafy.checkmate.question.vo.UpdateRequestQuestion;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class QuestionService {

    private final QuestionRepository questionRepository;

    @Deprecated
    public static PageRequest of(int page, int size) {

        return of(page, size);
    }

    public void registerQuestion(Question question) {

        questionRepository.save(question);
    }

    public List<Question> getMemberQuestionList(Long memberId, int offset, int limit) {

        Pageable Pageable = PageRequest.of(offset, limit);

        return questionRepository.findQuestionsBymemberId(memberId, Pageable);
    }

    public int countMemberQuestionList(Long memberId) {

        return questionRepository.countQuestionsBymemberId(memberId);
    }

    public List<Question> getQuestionList(int listType, int offset, int limit) {

        LocalDate currentDate = LocalDate.now();
        Pageable pageable = PageRequest.of(offset, limit);

        switch (listType) {
            case 1: // 등록날짜순(내림차순)
                return questionRepository.findQuestionsByQuestionEndDateGreaterThanEqualAndQuestionStatusEqualsOrderByQuestionDateDesc(currentDate, 0, pageable);
            case 2: // 마감날짜순(오름차순)
                return questionRepository.findQuestionsByQuestionEndDateGreaterThanEqualAndQuestionStatusEqualsOrderByQuestionEndDate(currentDate, 0, pageable);
            case 3: // 포인트순(내림차순)
                return questionRepository.findQuestionsByQuestionEndDateGreaterThanEqualAndQuestionStatusEqualsOrderByQuestionPointDesc(currentDate, 0, pageable);
        }

        return null;
    }

    public int getQuestionListSize(int listType) {

        LocalDate currentDate = LocalDate.now();

        switch (listType) {
            case 1: // 등록날짜순(내림차순)
                return questionRepository.countQuestionsByQuestionEndDateGreaterThanEqualAndQuestionStatusEqualsOrderByQuestionDateDesc(currentDate, 0);
            case 2: // 마감날짜순(오름차순)
                return questionRepository.countQuestionsByQuestionEndDateGreaterThanEqualAndQuestionStatusEqualsOrderByQuestionEndDate(currentDate, 0);
            case 3: // 포인트순(내림차순)
                return questionRepository.countQuestionsByQuestionEndDateGreaterThanEqualAndQuestionStatusEqualsOrderByQuestionPointDesc(currentDate, 0);
        }

        return 0;
    }

    public void updateQuestion(UpdateRequestQuestion updateRequestQuestion) {

        Question question = questionRepository.findQuestionByQuestionId(updateRequestQuestion.getQuestionId());
        question.setQuestionExplain(updateRequestQuestion.getQuestionExplain());
        questionRepository.save(question);
    }
}
