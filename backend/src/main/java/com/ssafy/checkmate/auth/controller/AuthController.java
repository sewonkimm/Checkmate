package com.ssafy.checkmate.auth.controller;

import com.ssafy.checkmate.auth.dto.Auth;
import com.ssafy.checkmate.auth.service.AuthService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;

@Api(tags = "Auth", description = "인증 API")
@CrossOrigin
@RestController
@RequiredArgsConstructor
@RequestMapping("/auth")
public class AuthController {

    private final AuthService authService;

    @PostMapping
    public void registerAuth(@RequestBody Auth auth) {

        authService.insertAuth(auth);
    }

    @ApiOperation(value = "인증 파일업로드")
    @PostMapping("/fileUpload")
    public ResponseEntity<Map<String, Object>> fileUpload(@RequestBody MultipartFile authFile) {

        return authService.fileUpload(authFile);
    }
}
