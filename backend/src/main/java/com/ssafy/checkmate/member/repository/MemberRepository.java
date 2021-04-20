package com.ssafy.checkmate.member.repository;

import com.ssafy.checkmate.member.dto.Member;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MemberRepository extends CrudRepository<Member, String> {

    public Member findMemberByMemberEmail(String memberEmail);
}
