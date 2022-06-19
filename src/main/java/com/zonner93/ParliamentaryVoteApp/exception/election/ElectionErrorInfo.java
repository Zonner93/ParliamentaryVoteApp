package com.zonner93.ParliamentaryVoteApp.exception.election;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class ElectionErrorInfo {
    private final String message;
}
