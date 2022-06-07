package com.zonner93.ParliamentaryVoteApp.model.service.election;

import com.zonner93.ParliamentaryVoteApp.model.entity.Candidate;
import com.zonner93.ParliamentaryVoteApp.model.entity.Election;
import com.zonner93.ParliamentaryVoteApp.model.exception.election.ElectionError;
import com.zonner93.ParliamentaryVoteApp.model.exception.election.ElectionException;
import com.zonner93.ParliamentaryVoteApp.model.repository.CandidateRepository;
import com.zonner93.ParliamentaryVoteApp.model.repository.ElectionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
public class ElectionServiceImpl implements ElectionService {
    private final ElectionRepository electionRepository;
    private final CandidateRepository candidateRepository;

    @Override
    public void createElection(Election election) {
        Election savedElection = electionRepository.save(election);
        long electionId = savedElection.getId();
        List<Candidate> candidateList = election.getCandidateList();
        if (Objects.nonNull(candidateList)) {
            for (Candidate candidate : candidateList) {
                candidate.setElectionId(electionId);
            }
        }
        electionRepository.save(savedElection);
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
//        if (!electionRepository.existsById(id)) {
//            throw new ElectionException(ElectionError.ELECTION_DOES_NOT_EXISTS);
//        }
        validateIfElectionExists(id);
        electionRepository.deleteById(id);
    }

    @Override
    public void patchElection(long id, String name, String description, String startDate, String endDate, List<Candidate> candidateList) {
//        if (!electionRepository.existsById(id)) {
//            throw new ElectionException(ElectionError.ELECTION_DOES_NOT_EXISTS);
//        }
        validateIfElectionExists(id);
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
            List<Candidate> oldCandidatesList = election.getCandidateList();
            if (Objects.nonNull(oldCandidatesList) && !oldCandidatesList.isEmpty()) {
                for (Candidate candidate : oldCandidatesList) {
                    candidate.setElectionId(0);
                    candidateRepository.save(candidate);
                }
            }
            for (Candidate candidate : candidateList) {
                candidate.setElectionId(id);
            }

            List<Candidate> currentCandidateList = new ArrayList<>();

            currentCandidateList.addAll(candidateList);
            election.setCandidateList(currentCandidateList);
        }
        electionRepository.save(election);
    }

    @Override
    public HashMap<Long, Long> getElectionVoteResults(long id) {
        validateIfElectionExists(id);
        Election election = electionRepository.findById(id);
        List<Candidate> candidateList = election.getCandidateList();
        HashMap<Long, Long> electionVoteResults = new HashMap<>();
        for (Candidate candidate : candidateList) {
            electionVoteResults.put(candidate.getId(), (long) candidate.getVoteResultsList().size());
        }
        return electionVoteResults;
    }
    protected void validateIfElectionExists(long id) {
        if (!electionRepository.existsById(id)) {
            throw new ElectionException(ElectionError.ELECTION_DOES_NOT_EXISTS);
        }
    }
}
