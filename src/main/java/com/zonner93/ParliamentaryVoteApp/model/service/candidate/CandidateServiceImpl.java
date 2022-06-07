package com.zonner93.ParliamentaryVoteApp.model.service.candidate;

import com.zonner93.ParliamentaryVoteApp.model.entity.Candidate;
import com.zonner93.ParliamentaryVoteApp.model.entity.Election;
import com.zonner93.ParliamentaryVoteApp.model.entity.VoteResults;
import com.zonner93.ParliamentaryVoteApp.model.exception.candidate.CandidateError;
import com.zonner93.ParliamentaryVoteApp.model.exception.candidate.CandidateException;
import com.zonner93.ParliamentaryVoteApp.model.exception.election.ElectionError;
import com.zonner93.ParliamentaryVoteApp.model.exception.election.ElectionException;
import com.zonner93.ParliamentaryVoteApp.model.repository.CandidateRepository;
import com.zonner93.ParliamentaryVoteApp.model.repository.ElectionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class CandidateServiceImpl implements CandidateService {
    private final CandidateRepository candidateRepository;
    private final ElectionRepository electionRepository;

    @Override
    public void createCandidate(Candidate candidate) {
        candidateRepository.save(candidate);
    }

    @Override
    public void deleteCandidate(long id) {
        validateIfCandidateExists(id);
        candidateRepository.deleteById(id);
    }

    @Override
    public Candidate getCandidate(long id) {
        validateIfCandidateExists(id);
        return candidateRepository.findById(id);
    }

    @Override
    public List<Candidate> getElectionCandidates(long electionId) {
        validateIfElectionExists(electionId);
        Election election = electionRepository.findById(electionId);
        return election.getCandidateList();
    }

    @Override
    public void patchCandidate(long id, String politicalGroup, Integer listPosition, Election election,
                               String firstName, String lastName, String personalIdNumber,
                               List<VoteResults> voteResultsList) {

        validateIfCandidateExists(id);
        Candidate candidate = candidateRepository.findById(id);
        if (Objects.nonNull(politicalGroup)) {
            candidate.setPoliticalGroup(politicalGroup);
        }
        if (Objects.nonNull(listPosition)) {
            candidate.setListPosition(listPosition);
        }
        if (Objects.nonNull(firstName)) {
            candidate.setFirstName(firstName);
        }
        if (Objects.nonNull(lastName)) {
            candidate.setLastName(lastName);
        }
        if (Objects.nonNull(personalIdNumber)) {
            candidate.setPersonalIdNumber(personalIdNumber);
        }
        if (Objects.nonNull(voteResultsList)) {
            candidate.setVoteResultsList(voteResultsList);
        }
        candidateRepository.save(candidate);
    }

    @Override
    public long getVoteCount(long id) {
        if (!candidateRepository.existsById(id)) {
            throw new CandidateException(CandidateError.CANDIDATE_DOES_NOT_EXISTS);
        }
        return candidateRepository.findById(id).getVoteResultsList().size();
    }

    @Override
    public List<Candidate> getAllCandidates() {
        return candidateRepository.findAll();
    }

    @Override
    public void voteForCandidate(long id) {
        validateId(id);
        validateIfCandidateExists(id);
        Candidate currentCandidate =  candidateRepository.findById(id);
        VoteResults voteResults = new VoteResults();
        voteResults.setCandidate(currentCandidate);
        voteResults.setTimestamp(LocalDateTime.now());
//        TODO:
    }

    protected void validateIfCandidateExists(long id) {
        if (!candidateRepository.existsById(id)) {
            throw new CandidateException(CandidateError.CANDIDATE_DOES_NOT_EXISTS);
        }
    }

    protected void validateIfElectionExists(long electionId) {
        if (!electionRepository.existsById(electionId)) {
            throw new ElectionException(ElectionError.ELECTION_DOES_NOT_EXISTS);
        }
    }

    protected void validateId(long id) {
        if (id < 0) {
            throw new CandidateException(CandidateError.INVALID_ID);
        }
    }
}
