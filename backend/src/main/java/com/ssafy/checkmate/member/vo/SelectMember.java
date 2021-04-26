package com.ssafy.checkmate.member.vo;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class SelectMember {

    private long memberId;

    @NonNull
    private String memberEmail;

    @NonNull
    private String memberNickName;

    @NonNull
    private String memberNativeLang;

    @NonNull
    private int memberTypeId;

    @NonNull
    private String memberIntroduce;

    private int memberPoint;

    private String memberProfileUrl;
}
