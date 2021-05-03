package com.ssafy.checkmate.member.repository;

import com.ssafy.checkmate.member.dto.Member;
import com.ssafy.checkmate.member.vo.SelectMember;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MemberRepository extends CrudRepository<Member, String> {

    public Member findMemberByMemberEmail(String memberEmail);

    public Member findMemberByMemberNickname(String memberNickname);

    public Member findMemberByMemberId(Long memberId);

    public Member findMemberByMemberEmailAndMemberPassword(String memberEmail, String memberPassword);

}