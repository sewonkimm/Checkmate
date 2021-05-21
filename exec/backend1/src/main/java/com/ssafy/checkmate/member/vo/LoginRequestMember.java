package com.ssafy.checkmate.member.vo;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NonNull;

@Getter
@AllArgsConstructor
public class LoginRequestMember {

    @NonNull
    private String memberEmail;

    @NonNull
    private String memberPassword;
}
