package com.ssafy.checkmate.review.service;

import com.ssafy.checkmate.review.dto.Review;
import com.ssafy.checkmate.review.repository.ReviewRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ReviewService {

    private final ReviewRepository reviewRepository;

    public void insertReview(Review review) {

        reviewRepository.save(review);
    }
}
