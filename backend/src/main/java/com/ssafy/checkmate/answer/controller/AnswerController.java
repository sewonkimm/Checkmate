package com.ssafy.checkmate.answer.controller;

import com.ssafy.checkmate.answer.dto.Answer;
import com.ssafy.checkmate.answer.service.AnswerService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Api(tags = "answers", description = "답변")
@CrossOrigin
@RestController
@RequiredArgsConstructor
@RequestMapping("/answers")
public class AnswerController {

    private final AnswerService answerService;

    @ApiOperation(value = "답변하기", notes = "질문에 대한 첨삭을 진행합니다.")
    @PostMapping
    public void addAnswer(@RequestBody Answer answer) {

        answerService.addAnswer(answer);
    }

    @ApiOperation(value = "답변조회", notes = "답변 목록을 받아옵니다.")
    @GetMapping("/list/{questionId}")
    public List<Answer> readAnswer(@PathVariable("questionId") Long questionId){

        return answerService.getAnswer(questionId);
    }
}
