package com.ssafy.checkmate.review.repository;

import com.ssafy.checkmate.review.dto.Review;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReviewRepository extends CrudRepository<Review, String> {
}
