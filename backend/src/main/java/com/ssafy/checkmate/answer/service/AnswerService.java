package com.ssafy.checkmate.answer.service;

import com.ssafy.checkmate.answer.dto.Answer;
import com.ssafy.checkmate.answer.repository.AnswerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AnswerService {

    private final AnswerRepository answerRepository;

    public void addAnswer(Answer answer) {

        answerRepository.save(answer);
    }
}
