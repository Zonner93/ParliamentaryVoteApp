package com.zonner93.ParliamentaryVoteApp.model.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum ElectionError {
    ELECTION_DOES_NOT_EXISTS("Election does not exists");
    private final String message;
}
