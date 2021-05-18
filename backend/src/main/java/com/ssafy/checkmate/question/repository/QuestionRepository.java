package com.ssafy.checkmate.question.repository;

import com.ssafy.checkmate.question.dto.Question;
import com.ssafy.checkmate.question.vo.ReadQuestionAnswer;
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

    public List<Question> findQuestionsByQuestionEndDateGreaterThanEqualOrderByQuestionDateDesc(LocalDate currentDate, Pageable Pageable);

    public List<Question> findQuestionsByQuestionEndDateGreaterThanEqualOrderByQuestionEndDate(LocalDate currentDate, Pageable Pageable);

    public List<Question> findQuestionsByQuestionEndDateGreaterThanEqualOrderByQuestionPointDesc(LocalDate currentDate, Pageable Pageable);

    public int countQuestionsByQuestionEndDateGreaterThanEqualOrderByQuestionDateDesc(LocalDate currentDate);

    public int countQuestionsByQuestionEndDateGreaterThanEqualOrderByQuestionEndDate(LocalDate currentDate);

    public int countQuestionsByQuestionEndDateGreaterThanEqualOrderByQuestionPointDesc(LocalDate currentDate);

    public Question findQuestionByQuestionId(Long questionId);
}
