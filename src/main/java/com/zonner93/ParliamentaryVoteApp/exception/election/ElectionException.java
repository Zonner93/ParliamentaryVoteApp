package com.zonner93.ParliamentaryVoteApp.exception.election;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class ElectionException extends RuntimeException {
    private final ElectionError electionError;
}
