package com.ssafy.checkmate.answer.repository;

import com.ssafy.checkmate.answer.dto.Answer;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AnswerRepository extends CrudRepository<Answer, String> {

}
