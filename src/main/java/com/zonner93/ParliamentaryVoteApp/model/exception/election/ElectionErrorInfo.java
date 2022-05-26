package com.zonner93.ParliamentaryVoteApp.model.exception.election;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class ElectionErrorInfo {
    private final String message;
}
