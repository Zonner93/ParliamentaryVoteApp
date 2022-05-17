package com.zonner93.ParliamentaryVoteApp.model.service.election;

import com.zonner93.ParliamentaryVoteApp.model.entity.Election;
import com.zonner93.ParliamentaryVoteApp.model.exception.ElectionError;
import com.zonner93.ParliamentaryVoteApp.model.exception.ElectionException;
import com.zonner93.ParliamentaryVoteApp.model.repository.ElectionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ElectionServiceImpl implements ElectionService {
    private final ElectionRepository electionRepository;

    @Override
    public void createElection(Election election) {
        electionRepository.save(election);
    }

    @Override
    public List<Election> getAllElectionList() {
        return electionRepository.findAll();
    }

    @Override
    public List<Election> getElectionListByName(String name) {
        return electionRepository.findAllByNameContaining(name);
    }

    @Override
    public Election getElectionById(long id) {
        return electionRepository.findById(id);
    }

    @Override
    public void deleteElectionById(long id) {
        if (!electionRepository.existsById(id)) {
            throw new ElectionException(ElectionError.ELECTION_DOES_NOT_EXISTS);
        }
        electionRepository.deleteById(id);
    }
}
