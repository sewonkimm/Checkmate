package com.ssafy.checkmate.review.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.NonNull;

import javax.persistence.*;

@Entity
@Getter
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
