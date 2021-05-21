package com.ssafy.checkmate.question.dto;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "question")
public class Question {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long questionId;

    @NonNull
    private Long memberId;

    @NonNull
    private String questionTitle;

    @NonNull
    private String questionExplain;

    @NonNull
    private String questionContents;

    @Column(insertable = false, updatable = false)
    private LocalDateTime questionDate;

    @NonNull
    private LocalDate questionEndDate;

    @NonNull
    private int questionStatus;

    private int questionPoint;

    private String questionUrl;
}
