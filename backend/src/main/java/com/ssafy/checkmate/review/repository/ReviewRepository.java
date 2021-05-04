package com.ssafy.checkmate.review.repository;

import com.ssafy.checkmate.review.dto.Review;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReviewRepository extends CrudRepository<Review, String> {

    public Review findReviewByAnswerId(Long answerId);

    public boolean existsByAnswerId(Long answerId);
}
