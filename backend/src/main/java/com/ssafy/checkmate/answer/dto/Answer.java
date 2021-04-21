package com.ssafy.checkmate.answer.dto;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;


@Entity
@Getter
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

    @Column(insertable=false, updatable=false)
    private LocalDateTime answerDate;

    private int answerSelect;

    private String answerReplyUrl;
}
