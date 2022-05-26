package com.zonner93.ParliamentaryVoteApp.model.exception.candidate;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum CandidateError {
    CANDIDATE_DOES_NOT_EXISTS("Candidate does not exists");
    private final String message;
}
