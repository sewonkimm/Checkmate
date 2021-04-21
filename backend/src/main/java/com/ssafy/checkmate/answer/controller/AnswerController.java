package com.ssafy.checkmate.answer.controller;

import com.ssafy.checkmate.answer.dto.Answer;
import com.ssafy.checkmate.answer.service.AnswerService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@Api(tags = "answers", description = "답변")
@CrossOrigin
@RestController
@RequiredArgsConstructor
@RequestMapping("/answers")
public class AnswerController {

    private final AnswerService answerService;

    @ApiOperation(value = "답변하기", notes = "질문에 대한 첨삭을 진행합니다.")
    @PostMapping("/addAnswer")
    public void addAnswer(@RequestBody Answer answer){

        answerService.addAnswer(answer);
    }
}
