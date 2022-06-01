package com.zonner93.ParliamentaryVoteApp.model.exception.candidate;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class CandidateExceptionHandler {

    @ExceptionHandler(value = CandidateException.class)
    public ResponseEntity<CandidateErrorInfo> handlerCandidateException(CandidateException exception) {
        HttpStatus httpStatus = HttpStatus.MULTI_STATUS;
        if (CandidateError.CANDIDATE_DOES_NOT_EXISTS.equals(exception.getCandidateError())) {
            httpStatus = HttpStatus.BAD_REQUEST;
        }
        return ResponseEntity.status(httpStatus).body(new CandidateErrorInfo(exception.getCandidateError().getMessage()));
    }
}

