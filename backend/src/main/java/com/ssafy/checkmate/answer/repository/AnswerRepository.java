package com.ssafy.checkmate.answer.repository;

import com.ssafy.checkmate.answer.dto.Answer;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AnswerRepository extends CrudRepository<Answer, Long> {

    public List<Answer> findAllByQuestionId(Long questionId);
}
