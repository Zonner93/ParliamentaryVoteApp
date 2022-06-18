package com.zonner93.ParliamentaryVoteApp.model.exception.user;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class UserErrorInfo {
    private final String message;
}
