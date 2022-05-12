package com.zonner93.ParliamentaryVoteApp.model.service.election;

import com.zonner93.ParliamentaryVoteApp.model.entity.Election;
import com.zonner93.ParliamentaryVoteApp.model.repository.ElectionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ElectionServiceImpl implements ElectionService {
    private final ElectionRepository electionRepository;

    @Override
    public void createElection(Election election) {
        electionRepository.save(election);
    }
}
