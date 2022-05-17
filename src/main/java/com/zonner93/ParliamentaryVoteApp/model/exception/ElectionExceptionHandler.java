package com.zonner93.ParliamentaryVoteApp.model.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ElectionExceptionHandler {

    @ExceptionHandler(value = ElectionException.class)
    public ResponseEntity<ElectionErrorInfo> handlerElectionException(ElectionException exception) {
        HttpStatus httpStatus = HttpStatus.MULTI_STATUS;
        if (ElectionError.ELECTION_DOES_NOT_EXISTS.equals(exception.getElectionError())) {
            httpStatus = HttpStatus.BAD_REQUEST;
        }


        return ResponseEntity.status(httpStatus).body(new ElectionErrorInfo(exception.getElectionError().getMessage()));
    }
}
