package com.zonner93.ParliamentaryVoteApp.exception.candidate;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class CandidateException extends RuntimeException {
    private final CandidateError candidateError;
}
