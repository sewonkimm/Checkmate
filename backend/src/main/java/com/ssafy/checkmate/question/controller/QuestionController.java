package com.ssafy.checkmate.question.controller;

import com.ssafy.checkmate.question.dto.Question;
import com.ssafy.checkmate.question.service.QuestionService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@Api(tags = "Questions", description = "질문 API")
@CrossOrigin
@RestController
@RequiredArgsConstructor
@RequestMapping("/questions")
public class QuestionController {

    private final QuestionService questionService;

    @ApiOperation(value = "질문등록", notes = "질문을 등록합니다.")
    @PostMapping
    public void register(@RequestBody Question question) {

        questionService.registerQuestion(question);
    }
}
