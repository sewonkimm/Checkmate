package com.ssafy.checkmate.answer.service;

import com.ssafy.checkmate.answer.dto.Answer;
import com.ssafy.checkmate.answer.repository.AnswerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AnswerService {

    private final AnswerRepository answerRepository;

    public void addAnswer(Answer answer) {

        answerRepository.save(answer);
    }

    @Deprecated
    public static PageRequest of(int page, int size) {

        return of(page, size);
    }

    public int getAnswerSize(Long id) {

        List<Answer> list = answerRepository.findAllByQuestionId(id);

        return list.size();
    }
    public List<Answer> getAnswer(Long id, int offset, int limit) {

        Pageable pageable = PageRequest.of(offset, limit);

        return answerRepository.findAllByQuestionIdOrderByAnswerDateDesc(id, pageable);
    }
}
