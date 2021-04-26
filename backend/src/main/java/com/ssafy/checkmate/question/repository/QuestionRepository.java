package com.ssafy.checkmate.question.repository;

import com.ssafy.checkmate.question.dto.Question;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface QuestionRepository extends CrudRepository<Question, String> {

    public Question findQuestionByQuestionId(Long questionId);
}
