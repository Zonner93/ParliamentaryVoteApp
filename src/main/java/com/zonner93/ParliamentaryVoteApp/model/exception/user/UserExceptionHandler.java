package com.zonner93.ParliamentaryVoteApp.model.exception.user;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class UserExceptionHandler {
    public ResponseEntity<UserErrorInfo> handlerUserException(UserException exception) {
        HttpStatus httpStatus = HttpStatus.MULTI_STATUS;
        if (UserError.USER_WITH_EMAIL_PROVIDED_ALREADY_EXISTS.equals(exception.getUserError())) {
            httpStatus = HttpStatus.BAD_REQUEST;
        }
        return ResponseEntity.status(httpStatus).body(new UserErrorInfo(exception.getUserError().getMessage()));
    }
}
