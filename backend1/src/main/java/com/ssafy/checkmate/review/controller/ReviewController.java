package com.ssafy.checkmate.review.controller;

import com.ssafy.checkmate.review.dto.Review;
import com.ssafy.checkmate.review.service.ReviewService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@Api(tags = "Reviews", description = "리뷰 API")
@CrossOrigin
@RestController
@RequiredArgsConstructor
@RequestMapping("/reviews")
public class ReviewController {

    private final ReviewService reviewService;

    @ApiOperation(value = "리뷰하기", notes = "채택된 답변에 리뷰하기")
    @PostMapping
    public void registerReview(@RequestBody Review review) {

        reviewService.insertReview(review);
    }

    @ApiOperation(value = "리뷰 수정하기", notes = "채택된 답변에 리뷰 수정하기")
    @PutMapping
    public void updateReview(@RequestBody Review review) {

        reviewService.updateReview(review);
    }
}
