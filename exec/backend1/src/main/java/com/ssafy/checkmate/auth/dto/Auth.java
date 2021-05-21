package com.ssafy.checkmate.auth.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.NonNull;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "auth")
public class Auth {

    @Id
    private Long memberId;

    @NonNull
    private String authUniversity;

    @NonNull
    private String authDepartment;

    @NonNull
    private String authName;

    @NonNull
    private String authFileUrl;

    @NonNull
    private int authStatus;
}
