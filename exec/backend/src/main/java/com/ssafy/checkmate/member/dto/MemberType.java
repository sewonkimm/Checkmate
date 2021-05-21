package com.ssafy.checkmate.member.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum MemberType {

    ADMIN(0, "관리자"), USER(1, "사용자"), SELLER(2, "판매자");

    private int typeId;

    private String name;
}
