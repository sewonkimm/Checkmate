package com.ssafy.checkmate.question.repository;

import com.ssafy.checkmate.question.dto.Question;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuestionRepository extends CrudRepository<Question, String> {

    public List<Question> findAll();

    public Question findQuestionByQuestionId(Long questionId);
}
