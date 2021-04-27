package com.ssafy.checkmate.question.controller;

import com.ssafy.checkmate.question.dto.Question;
import com.ssafy.checkmate.question.service.QuestionService;
import com.ssafy.checkmate.question.vo.UpdateRequestQuestion;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

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

    @ApiOperation(value = "사용자 질문목록", notes = "사용자가 작성한 질문 목록을 불러옵니다.")
    @GetMapping("/member/{memberId}/{offset}/{limit}")
    public Map<String, Object> getMemberQuestionList(@PathVariable Long memberId, @PathVariable int offset, @PathVariable int limit) {

        Map<String, Object> resultMap = new HashMap<>();

        resultMap.put("list", questionService.getMemberQuestionList(memberId, offset, limit));
        resultMap.put("totalSize", questionService.countMemberQuestionList(memberId));

        return resultMap;
    }

    @ApiOperation(value = "전체 질문목록", notes = "게시물을 읽어오는 타입에 따라 질문 목록을 불러옵니다.")
    @GetMapping("/{listType}/{offset}/{limit}")
    public Map<String, Object> getQuestionList(@PathVariable int listType, @PathVariable int offset, @PathVariable int limit) {

        Map<String, Object> resultMap = new HashMap<>();

        resultMap.put("list", questionService.getQuestionList(listType, offset, limit));
        resultMap.put("totalSize", questionService.getQuestionListSize(listType));

        return resultMap;
    }

    @ApiOperation(value = "질문수정", notes = "질문을 수정합니다.")
    @PutMapping
    public void update(@RequestBody UpdateRequestQuestion updateRequestQuestion) {

        questionService.updateQuestion(updateRequestQuestion);
    }
}
