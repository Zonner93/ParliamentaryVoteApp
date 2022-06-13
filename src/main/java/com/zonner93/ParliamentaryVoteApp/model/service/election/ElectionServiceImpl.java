package com.zonner93.ParliamentaryVoteApp.model.service.election;

import com.zonner93.ParliamentaryVoteApp.model.entity.Candidate;
import com.zonner93.ParliamentaryVoteApp.model.entity.Election;
import com.zonner93.ParliamentaryVoteApp.model.exception.candidate.CandidateError;
import com.zonner93.ParliamentaryVoteApp.model.exception.candidate.CandidateException;
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
        validateIfElectionExists(id);
        electionRepository.deleteById(id);
    }

    @Override
    public void patchElection(long id, Election election) {
        validateIfElectionExists(id);
        String name = election.getName();
        if (Objects.nonNull(name)) {
            election.setName(name);
        }
        String description = election.getDescription();
        if (Objects.nonNull(description)) {
            election.setDescription(description);
        }
        String startDate = election.getStartDate();
        if (Objects.nonNull(startDate)) {
            election.setStartDate(startDate);
        }
        String endDate = election.getEndDate();
        if (Objects.nonNull(endDate)) {
            election.setEndDate(endDate);
        }

        List<Candidate>  candidateList = election.getCandidateList();
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

    @Override
    public void addCandidate(long electionId, long candidateId) {
        validateIfCandidateExists(candidateId);
        Candidate candidate = candidateRepository.findById(candidateId);
        validateIfElectionExists(electionId);
        Election election = electionRepository.findById(electionId);
        election.getCandidateList().add(candidate);
        candidate.setElectionId(electionId);
        electionRepository.save(election);
    }

    @Override
    public void removeCandidate(long electionId, long candidateId) {
        validateIfCandidateExists(candidateId);
        Candidate candidate = candidateRepository.findById(candidateId);
        validateIfElectionExists(electionId);
        Election election = electionRepository.findById(electionId);
        election.getCandidateList().remove(candidate);
        candidate.setElectionId(0);
        electionRepository.save(election);
    }

    protected void validateIfElectionExists(long id) {
        if (!electionRepository.existsById(id)) {
            throw new ElectionException(ElectionError.ELECTION_DOES_NOT_EXISTS);
        }
    }

    protected void validateIfCandidateExists(long id) {
        if (!candidateRepository.existsById(id)) {
            throw new CandidateException(CandidateError.CANDIDATE_DOES_NOT_EXISTS);
        }
    }
}
