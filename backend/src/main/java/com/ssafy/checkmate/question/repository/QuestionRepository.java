package com.ssafy.checkmate.question.repository;

import com.ssafy.checkmate.question.dto.Question;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface QuestionRepository extends CrudRepository<Question, String> {

    public List<Question> findQuestionsBymemberId(Long memberId, Pageable Pageable);

    public List<Question> findQuestionsBymemberId(Long memberId);

    public int countQuestionsBymemberId(Long memberId);

    public List<Question> findQuestionsByQuestionEndDateGreaterThanEqualAndQuestionStatusEqualsOrderByQuestionDateDesc(LocalDate currentDate, int questionStatus, Pageable Pageable);

    public List<Question> findQuestionsByQuestionEndDateGreaterThanEqualAndQuestionStatusEqualsOrderByQuestionEndDate(LocalDate currentDate, int questionStatus, Pageable Pageable);

    public List<Question> findQuestionsByQuestionEndDateGreaterThanEqualAndQuestionStatusEqualsOrderByQuestionPointDesc(LocalDate currentDate, int questionStatus, Pageable Pageable);

    public int countQuestionsByQuestionEndDateGreaterThanEqualAndQuestionStatusEqualsOrderByQuestionDateDesc(LocalDate currentDate, int questionStatus);

    public int countQuestionsByQuestionEndDateGreaterThanEqualAndQuestionStatusEqualsOrderByQuestionEndDate(LocalDate currentDate, int questionStatus);

    public int countQuestionsByQuestionEndDateGreaterThanEqualAndQuestionStatusEqualsOrderByQuestionPointDesc(LocalDate currentDate, int questionStatus);

    public Question findQuestionByQuestionId(Long questionId);
}
