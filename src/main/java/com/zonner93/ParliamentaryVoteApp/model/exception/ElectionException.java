package com.zonner93.ParliamentaryVoteApp.model.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class ElectionException extends RuntimeException {
    private final ElectionError electionError;
}
