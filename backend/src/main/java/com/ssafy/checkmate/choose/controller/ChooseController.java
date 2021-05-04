package com.ssafy.checkmate.choose.controller;

import com.ssafy.checkmate.choose.service.ChooseService;
import com.ssafy.checkmate.review.dto.Review;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@Api(tags = "Choose", description = "채택 API")
@CrossOrigin
@RestController
@RequiredArgsConstructor
@RequestMapping("/choose")
public class ChooseController {

    private final ChooseService chooseService;

    @ApiOperation(value = "채택하기", notes = "답변을 채택합니다.")
    @PutMapping("/{questionId}/{answerId}")
    public void chooseAnswer(@PathVariable Long questionId, @PathVariable Long answerId, @RequestBody Review review) {

        chooseService.chooseAnswer(questionId, answerId, review);

        chooseService.calculateGrade(answerId, review);
    }
}
