package com.ssafy.checkmate.question.vo;

import com.ssafy.checkmate.question.dto.Question;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class ReadQuestionAnswer {

    public ReadQuestionAnswer() {
    }

    private Question question;

    private int answerCount;
}
