package com.ssafy.checkmate.question.dto;

import lombok.*;

import javax.persistence.*;
import java.sql.Date;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "question")
public class Question {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long questionId;

    @NonNull
    private long memberId;

    @NonNull
    private String questionTitle;

    @NonNull
    private String questionExplain;

    @NonNull
    private String questionContents;

    @Column(insertable = false, updatable = false)
    private Date questionDate;

    @NonNull
    private Date questionEndDate;

    @NonNull
    private int questionStatus;

    private int questionPoint;

    private String questionUrl;
}
