package com.ssafy.checkmate.auth.service;

import com.ssafy.checkmate.auth.dto.Auth;
import com.ssafy.checkmate.auth.repository.AuthRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final AuthRepository authRepository;

    public void insertAuth(Auth auth) {

        authRepository.save(auth);
    }

    public ResponseEntity<Map<String, Object>> fileUpload(MultipartFile authFile) {

        String filePath = "/files";
        String fileName = authFile.getOriginalFilename();

        int nameLen = fileName.length();
        int index = fileName.lastIndexOf('.');

        String subFileName = fileName.substring(0, index) + "_" + LocalDateTime.now();
        subFileName = subFileName.replace(":", "-");
        String subFileExtension = fileName.substring(index, nameLen);

        File saveFile = new File(filePath, "auth_" + subFileName + subFileExtension);

        try {
            authFile.transferTo(saveFile);
            fileName = "http://k4a106.p.ssafy.io:8888/" + "auth_" + subFileName + subFileExtension;
        } catch (IOException e) {
            e.printStackTrace();
        }

        Map<String, Object> resultMap = new HashMap<String, Object>();
        resultMap.put("fileUrl", fileName);

        return new ResponseEntity<Map<String, Object>>(resultMap, HttpStatus.ACCEPTED);
    }
}
