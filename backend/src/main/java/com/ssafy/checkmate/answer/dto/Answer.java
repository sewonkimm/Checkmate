package com.ssafy.checkmate.answer.dto;

import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name="answer")
public class Answer {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long answerId;

    @NonNull
    private Long memberId;

    @NonNull
    private Long questionId;

    @NonNull
    private String answerContext;

    @NonNull
    private String answerDate;

    private int answerSelect;

    private String answerReplyUrl;
}
