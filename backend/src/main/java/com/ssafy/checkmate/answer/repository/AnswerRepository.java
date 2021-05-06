package com.ssafy.checkmate.answer.repository;

import com.ssafy.checkmate.answer.dto.Answer;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

@Repository
public interface AnswerRepository extends CrudRepository<Answer, Long> {

    public Answer findAnswerByAnswerId(Long answerId);

    public List<Answer> findAnswerByMemberId(Long memberId);

    public List<Answer> findAllByQuestionId(Long questionId);

    public List<Answer> findAllByQuestionIdOrderByAnswerDateDesc(Long questionId, Pageable pageable);

    @Transactional
    public void deleteByAnswerId(Long answerId);

    public int countAnswerByQuestionId(Long questionId);
}
