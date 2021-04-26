package com.ssafy.checkmate.question.controller;

import com.ssafy.checkmate.question.dto.Question;
import com.ssafy.checkmate.question.service.QuestionService;
import com.ssafy.checkmate.question.vo.UpdateRequestQuestion;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

    @ApiOperation(value = "질문목록", notes = "질문 목록을 불러옵니다.")
    @GetMapping
    public List<Question> getList() {

        return questionService.getQuestionList();
    }

    @ApiOperation(value = "질문수정", notes = "질문을 수정합니다.")
    @PutMapping
    public void update(@RequestBody UpdateRequestQuestion updateRequestQuestion) {

        questionService.updateQuestion(updateRequestQuestion);
    }
}
