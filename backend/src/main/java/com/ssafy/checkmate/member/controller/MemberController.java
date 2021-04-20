package com.ssafy.checkmate.member.controller;

import com.ssafy.checkmate.member.dto.Member;
import com.ssafy.checkmate.member.service.MemberService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Api(tags = "Member", description = "사용자 API")
@RestController
@RequiredArgsConstructor
@RequestMapping("/members")
public class MemberController {

    private final MemberService memberService;

    @ApiOperation(value = "가입하기", notes = "중복 이메일, 이름을 검사합니다.")
    @PostMapping("/signUp")
    public void signUp(@RequestBody Member member) {
        memberService.signUp(member);
    }
}
