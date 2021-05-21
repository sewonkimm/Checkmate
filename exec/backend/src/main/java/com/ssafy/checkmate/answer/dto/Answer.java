package com.ssafy.checkmate.answer.dto;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "answer")
public class Answer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long answerId;

    @NonNull
    private Long memberId;

    @NonNull
    private Long questionId;

    @NonNull
    private String answerExplain;

    @NonNull
    private String answerContents;

    @Column(insertable = false, updatable = false)
    private LocalDateTime answerDate;

    @Column(insertable = false)
    private LocalDateTime answerModifiedDate;

    private int answerSelect;

    private String answerUrl;
}
