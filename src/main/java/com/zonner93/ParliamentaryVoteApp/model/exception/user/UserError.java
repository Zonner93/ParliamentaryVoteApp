package com.zonner93.ParliamentaryVoteApp.model.exception.user;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum UserError {
    USER_WITH_EMAIL_PROVIDED_ALREADY_EXISTS("Email is already used!"),
    PASSWORD_IS_TOO_SHORT("Password length must be greather or equals 8!");
    private final String message;
}
