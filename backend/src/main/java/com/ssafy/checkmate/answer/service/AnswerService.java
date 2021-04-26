package com.ssafy.checkmate.answer.service;

import com.ssafy.checkmate.answer.dto.Answer;
import com.ssafy.checkmate.answer.repository.AnswerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AnswerService {

    private final AnswerRepository answerRepository;

    public void addAnswer(Answer answer) {

        answerRepository.save(answer);
    }

    public List<Answer> getAnswer(Long id){

        return answerRepository.findAllByQuestionId(id);
    }
}
