package com.zonner93.ParliamentaryVoteApp.service.election;

import com.zonner93.ParliamentaryVoteApp.model.dto.ElectionDtoInput;
import com.zonner93.ParliamentaryVoteApp.model.entity.Candidate;
import com.zonner93.ParliamentaryVoteApp.model.entity.Election;
import com.zonner93.ParliamentaryVoteApp.exception.candidate.CandidateError;
import com.zonner93.ParliamentaryVoteApp.exception.candidate.CandidateException;
import com.zonner93.ParliamentaryVoteApp.exception.election.ElectionError;
import com.zonner93.ParliamentaryVoteApp.exception.election.ElectionException;
import com.zonner93.ParliamentaryVoteApp.repository.CandidateRepository;
import com.zonner93.ParliamentaryVoteApp.repository.ElectionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class ElectionServiceImpl implements ElectionService {
    private final ElectionRepository electionRepository;
    private final CandidateRepository candidateRepository;

    @Override
    public void createElection(ElectionDtoInput electionDtoInput) {
        Election election = convertElectionDtoOutputToEntity(electionDtoInput);
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
    public List<Election> getActiveElectionList() {
        LocalDateTime datetimeNow = LocalDateTime.now();
        List<Election> electionList = electionRepository.findByEndDateGreaterThan(datetimeNow);
        List<Election> activeElectionList = new ArrayList<>();
        for (Election election : electionList) {
            LocalDateTime startDate = election.getStartDate();
            if (startDate.isBefore(datetimeNow)) {
                activeElectionList.add(election);
            }
        }
        return activeElectionList;
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
    public void patchElection(long id, ElectionDtoInput electionDtoInput) {
        validateIfElectionExists(id);
        Election election = convertElectionDtoOutputToEntity(electionDtoInput);
        election.setId(id);
        String name = election.getName();
        if (Objects.nonNull(name)) {
            election.setName(name);
        }
        String description = election.getDescription();
        if (Objects.nonNull(description)) {
            election.setDescription(description);
        }
        LocalDateTime startDate = election.getStartDate();
        if (Objects.nonNull(startDate)) {
            election.setStartDate(startDate);
        }
        LocalDateTime endDate = election.getEndDate();
        if (Objects.nonNull(endDate)) {
            election.setEndDate(endDate);
        }

        List<Candidate> candidateList = election.getCandidateList();
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

    protected Election convertElectionDtoOutputToEntity(ElectionDtoInput electionDtoInput) {

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

        Election election = new Election();

        if (Objects.nonNull(electionDtoInput.getName())) {
            election.setName(electionDtoInput.getName());
        }
        if (Objects.nonNull(electionDtoInput.getDescription())) {
            election.setDescription(electionDtoInput.getDescription());
        }
        if (Objects.nonNull(electionDtoInput.getCandidateList())) {
            election.setCandidateList(electionDtoInput.getCandidateList());
        }
        if (Objects.nonNull(electionDtoInput.getStartDate())) {
            LocalDateTime startDate = LocalDateTime.parse(electionDtoInput.getStartDate(), formatter);
            election.setStartDate(startDate);
        }
        if (Objects.nonNull(electionDtoInput.getEndDate())) {
            LocalDateTime endDate = LocalDateTime.parse(electionDtoInput.getEndDate(), formatter);
            election.setEndDate(endDate);
        }
        return election;
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
