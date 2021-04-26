package com.ssafy.checkmate.member.service;

import com.ssafy.checkmate.common.exception.LoginFailedException;
import com.ssafy.checkmate.common.exception.ValidationException;
import com.ssafy.checkmate.common.security.Sha256;
import com.ssafy.checkmate.member.dto.Member;
import com.ssafy.checkmate.member.repository.MemberRepository;
import com.ssafy.checkmate.member.vo.SelectMember;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;
    private final JwtService jwtService;
    private final Sha256 sha256;

    public void signUp(Member member) {

        validateSignUp(member);
        member.setMemberPassword(sha256.encryption(member.getMemberPassword()));
        memberRepository.save(member);
    }

    public void validateSignUp(Member member) {

        if (memberRepository.findMemberByMemberEmail(member.getMemberEmail()) != null) {
            throw new ValidationException("이미 존재하는 이메일입니다.");
        }
    }

    public ResponseEntity<Map<String, Object>> signIn(String memberEmail, String memberPassword) {

        Map<String, Object> resultMap = new HashMap<String, Object>();
        String password = sha256.encryption(memberPassword);
        Member member = memberRepository.findMemberByMemberEmailAndMemberPassword(memberEmail, password);

        if (member == null) {
            throw new LoginFailedException("사용자 정보가 틀렸습니다.");
        }

        String token = jwtService.create(member);
        resultMap.put("accesstoken", token);
        resultMap.put("message", "Success");

        return new ResponseEntity<Map<String, Object>>(resultMap, HttpStatus.ACCEPTED);
    }

    public SelectMember selectMember(Long id) {

        Member member = memberRepository.findMemberByMemberId(id);
        SelectMember memberSelect = new SelectMember();

        memberSelect.setMemberEmail(member.getMemberEmail());
        memberSelect.setMemberNickname(member.getMemberNickname());
        memberSelect.setMemberNativeLang(member.getMemberNativeLang());
        memberSelect.setMemberProfileUrl(member.getMemberProfileUrl());
        memberSelect.setMemberPoint(member.getMemberPoint());
        memberSelect.setMemberIntroduce(member.getMemberIntroduce());
        memberSelect.setMemberTypeId(member.getMemberTypeId());

        return memberSelect;
    }
}
