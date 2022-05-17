package com.zonner93.ParliamentaryVoteApp.model.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class ElectionErrorInfo {
    private final String message;
}
