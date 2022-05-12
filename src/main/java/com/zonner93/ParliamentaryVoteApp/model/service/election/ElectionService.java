package com.zonner93.ParliamentaryVoteApp.model.service.election;

import com.zonner93.ParliamentaryVoteApp.model.entity.Election;

import java.time.LocalDateTime;

public interface ElectionService {
    public void createElection(Election election);
}
