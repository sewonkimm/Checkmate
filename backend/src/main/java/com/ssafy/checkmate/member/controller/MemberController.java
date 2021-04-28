package com.ssafy.checkmate.member.controller;

import com.ssafy.checkmate.member.dto.Member;
import com.ssafy.checkmate.member.service.MemberService;
import com.ssafy.checkmate.member.vo.LoginRequestMember;
import com.ssafy.checkmate.member.vo.SelectMember;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

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

    @ApiOperation(value = "회원정보 조회하기", notes = "회원ID로 회원정보를 조회합니다.")
    @GetMapping("/{memberId}")
    public SelectMember selectMember(@PathVariable Long memberId) {

        return memberService.selectMember(memberId);
    }

    @ApiOperation(value = "프로필 사진 업로드 하기")
    @PostMapping("/fileUpload")
    public ResponseEntity<Map<String, Object>> fileUpload(@RequestBody MultipartFile proFile) {

        return memberService.fileUpload(proFile);
    }

    @ApiOperation(value = "이메일 중복검사", notes = "회원email로 중복여부를 검사합니다.")
    @GetMapping("/email/{memberEmail}")
    public int emailExits(@PathVariable String memberEmail) {

        return memberService.validateSignUp(memberEmail);
    }

    @ApiOperation(value = "닉네임 중복검사", notes = "회원NickName으로 중복여부를 검사합니다.")
    @GetMapping("/nickName/{memberNickName}")
    public int nickNameExits(@PathVariable String memberNickName) {

        return memberService.validateNickName(memberNickName);
    }
}
