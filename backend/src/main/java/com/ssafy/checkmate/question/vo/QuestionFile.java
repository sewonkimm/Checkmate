package com.ssafy.checkmate.question.vo;

import lombok.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class QuestionFile {

    private Long questionId;

    private Long memberId;

    private String questionTitle;

    private String questionExplain;

    private String questionContents;

    private LocalDateTime questionDate;

    private LocalDate questionEndDate;

    private int questionStatus;

    private int questionPoint;

    private MultipartFile questionUrl;
}
