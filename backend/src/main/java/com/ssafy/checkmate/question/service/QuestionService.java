package com.ssafy.checkmate.question.service;

import com.ssafy.checkmate.question.dto.Question;
import com.ssafy.checkmate.question.repository.QuestionRepository;
import com.ssafy.checkmate.question.vo.UpdateRequestQuestion;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class QuestionService {

    private final QuestionRepository questionRepository;

    public void registerQuestion(Question question) {

        questionRepository.save(question);
    }

    public void updateQuestion(UpdateRequestQuestion updateRequestQuestion) {

        Question question = questionRepository.findQuestionByQuestionId(updateRequestQuestion.getQuestionId());
        question.setQuestionExplain(updateRequestQuestion.getQuestionExplain());
        questionRepository.save(question);
    }
}
