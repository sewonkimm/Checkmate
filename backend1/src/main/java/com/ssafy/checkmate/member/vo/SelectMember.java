package com.ssafy.checkmate.member.vo;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class SelectMember {

    private Long memberId;

    @NonNull
    private String memberEmail;

    @NonNull
    private String memberNickname;

    @NonNull
    private String memberNativeLang;

    @NonNull
    private int memberTypeId;

    @NonNull
    private String memberIntroduce;

    @NonNull
    private double memberGrade;

    private int memberPoint;

    private String memberProfileUrl;
}
