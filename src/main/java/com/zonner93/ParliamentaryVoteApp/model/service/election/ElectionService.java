package com.zonner93.ParliamentaryVoteApp.model.service.election;

import java.time.LocalDateTime;

public interface ElectionService {
    public void createElection(String startDate, String endDate);
}
