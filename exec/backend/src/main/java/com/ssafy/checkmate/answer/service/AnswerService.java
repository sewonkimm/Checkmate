package com.ssafy.checkmate.answer.service;

import com.ssafy.checkmate.answer.dto.Answer;
import com.ssafy.checkmate.answer.repository.AnswerRepository;
import com.ssafy.checkmate.answer.vo.UpdateRequestAnswer;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class AnswerService {

    private final AnswerRepository answerRepository;

    public void addAnswer(Answer answer) {

        answerRepository.save(answer);
    }

    public ResponseEntity<Map<String, Object>> fileUpload(MultipartFile answerFile) {

        String filePath = "/files";
        String fileName = answerFile.getOriginalFilename();

        int nameLen = fileName.length();
        int index = fileName.lastIndexOf('.');

        String subFileName = fileName.substring(0, index) + "_" + LocalDateTime.now();
        subFileName = subFileName.replace(":", "-");
        String subFileExtension = fileName.substring(index, nameLen);

        File saveFile = new File(filePath, "answer_" + subFileName + subFileExtension);

        try {
            answerFile.transferTo(saveFile);
            fileName = "http://k4a106.p.ssafy.io:8888/" + "answer_" + subFileName + subFileExtension;
        } catch (IOException e) {
            e.printStackTrace();
        }

        Map<String, Object> resultMap = new HashMap<String, Object>();
        resultMap.put("fileUrl", fileName);

        return new ResponseEntity<Map<String, Object>>(resultMap, HttpStatus.ACCEPTED);
    }

    @Deprecated
    public static PageRequest of(int page, int size) {

        return of(page, size);
    }

    public int getAnswerSize(Long id) {

        List<Answer> list = answerRepository.findAllByQuestionId(id);

        return list.size();
    }

    public List<Answer> getAnswer(Long id, int offset, int limit) {

        Pageable pageable = PageRequest.of(offset, limit);

        return answerRepository.findAllByQuestionIdOrderByAnswerDateDesc(id, pageable);
    }

    @Transactional
    public void putAnswer(UpdateRequestAnswer updateRequestAnswer) {

        Answer answer = answerRepository.findAnswerByAnswerId(updateRequestAnswer.getAnswerId());

        answer.setAnswerContents(updateRequestAnswer.getAnswerContents());
        answer.setAnswerUrl(updateRequestAnswer.getAnswerUrl());
        answer.setAnswerModifiedDate(LocalDateTime.now());

        answerRepository.save(answer);
    }

    @Transactional
    public void deleteAnswer(Long id) {

        answerRepository.deleteByAnswerId(id);
    }
}
