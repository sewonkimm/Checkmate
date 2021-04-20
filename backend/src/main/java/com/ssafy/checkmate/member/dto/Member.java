package com.ssafy.checkmate.member.dto;

import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "member")
public class Member {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long memberId;

    @NonNull
    private String memberEmail;

    @NonNull
    private String memberNickname;

    @NonNull
    private String memberPassword;

    @NonNull
    private String memberNativeLang;

    @NonNull
    private int memberTypeId;

    private int memberPoint;

    private String memberProfileUrl;

}
