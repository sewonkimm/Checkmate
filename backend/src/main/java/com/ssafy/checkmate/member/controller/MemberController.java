package com.ssafy.checkmate.member.controller;

import com.ssafy.checkmate.member.dto.Member;
import com.ssafy.checkmate.member.service.MemberService;
import com.ssafy.checkmate.member.vo.LoginRequestMember;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@Api(tags = "Members", description = "사용자 API")
@CrossOrigin
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

    @ApiOperation(value = "로그인하기", notes = "이메일, 비밀번호로 사용자를 조회 후 로그인합니다.")
    @PostMapping("/signIn")
    public ResponseEntity<Map<String, Object>> signIn(@RequestBody LoginRequestMember loginRequestMember) {

        return memberService.signIn(loginRequestMember.getMemberEmail(), loginRequestMember.getMemberPassword());
    }
}
