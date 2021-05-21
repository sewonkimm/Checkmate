package com.ssafy.checkmate.review.dto;

import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "review")
public class Review {

    @Id
    private Long answerId;

    @NonNull
    private int reviewCategory;

    @NonNull
    private String reviewContents;

    @NonNull
    private int reviewScore;
}
