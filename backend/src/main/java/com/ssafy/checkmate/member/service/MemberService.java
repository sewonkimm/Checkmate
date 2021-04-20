package com.ssafy.checkmate.member.service;

import com.ssafy.checkmate.common.exception.ValidationException;
import com.ssafy.checkmate.common.security.Sha256;
import com.ssafy.checkmate.member.dto.Member;
import com.ssafy.checkmate.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;
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
}
