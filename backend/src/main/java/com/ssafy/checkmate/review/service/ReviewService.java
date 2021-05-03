package com.ssafy.checkmate.review.service;

import com.ssafy.checkmate.review.dto.Review;
import com.ssafy.checkmate.review.repository.ReviewRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class ReviewService {

    private final ReviewRepository reviewRepository;

    public void insertReview(Review review) {

        reviewRepository.save(review);
    }

    @Transactional
    public void updateReview(Review review) {

        Review reviewUpdate = reviewRepository.findReviewByAnswerId(review.getAnswerId());

        reviewUpdate.setAnswerId(review.getAnswerId());
        reviewUpdate.setReviewCategory(review.getReviewCategory());
        reviewUpdate.setReviewContents(review.getReviewContents());
        reviewUpdate.setReviewScore(review.getReviewScore());

        reviewRepository.save(reviewUpdate);
    }
}
