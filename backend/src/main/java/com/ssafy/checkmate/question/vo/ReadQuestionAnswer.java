package com.ssafy.checkmate.question.vo;

import com.ssafy.checkmate.question.dto.Question;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ReadQuestionAnswer {

    private Question question;

    private int answerCount;
}
