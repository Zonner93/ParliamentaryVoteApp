package com.zonner93.ParliamentaryVoteApp.model.exception.candidate;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum CandidateError {
    CANDIDATE_DOES_NOT_EXISTS("Candidate does not exists"),
    INVALID_ID("Id should be greater than zero.");
    private final String message;
}
