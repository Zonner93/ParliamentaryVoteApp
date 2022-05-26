package com.zonner93.ParliamentaryVoteApp.model.service.election;

import com.zonner93.ParliamentaryVoteApp.model.entity.Candidate;
import com.zonner93.ParliamentaryVoteApp.model.entity.Election;
import com.zonner93.ParliamentaryVoteApp.model.exception.ElectionError;
import com.zonner93.ParliamentaryVoteApp.model.exception.ElectionException;
import com.zonner93.ParliamentaryVoteApp.model.repository.ElectionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

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

    @Override
    public void patchElection(long id, String name, String description, String startDate, String endDate, List<Candidate> candidateList) {
        if (!electionRepository.existsById(id)) {
            throw new ElectionException(ElectionError.ELECTION_DOES_NOT_EXISTS);
        }
        Election election = electionRepository.findById(id);
        if (Objects.nonNull(name)) {
            election.setName(name);
        }
        if (Objects.nonNull(description)) {
            election.setDescription(description);
        }
        if (Objects.nonNull(startDate)) {
            election.setStartDate(startDate);
        }
        if (Objects.nonNull(endDate)) {
            election.setEndDate(endDate);
        }
        if (Objects.nonNull(candidateList) && !candidateList.isEmpty()) {
            List<Candidate> currentCandidateList = election.getCandidateList();
            currentCandidateList.addAll(candidateList);
            election.setCandidateList(currentCandidateList);
        }
        electionRepository.save(election);
    }
}
