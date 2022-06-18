package com.zonner93.ParliamentaryVoteApp.model.exception.user;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class UserExceptionHandler {

    @ExceptionHandler(value = UserException.class)
    public ResponseEntity<UserErrorInfo> handlerUserException(UserException exception) {
        HttpStatus httpStatus = HttpStatus.MULTI_STATUS;
        if (UserError.USER_WITH_EMAIL_PROVIDED_ALREADY_EXISTS.equals(exception.getUserError()) ||
                UserError.PASSWORD_IS_TOO_SHORT.equals(exception.getUserError()) ||
                UserError.USER_HAS_ALREADY_VOTED_IN_CURRENT_ELECTION.equals(exception.getUserError())
        ) {
            httpStatus = HttpStatus.BAD_REQUEST;
        }
        return ResponseEntity.status(httpStatus).body(new UserErrorInfo(exception.getUserError().getMessage()));
    }
}
