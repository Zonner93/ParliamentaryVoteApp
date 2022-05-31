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
        if (!candidateRepository.existsById(id)) {
            throw new CandidateException(CandidateError.CANDIDATE_DOES_NOT_EXISTS);
        }
        candidateRepository.deleteById(id);
    }

    @Override
    public List<Candidate> getElectionCandidates(long electionId) {
        if (!electionRepository.existsById(electionId)) {
            throw new ElectionException(ElectionError.ELECTION_DOES_NOT_EXISTS);
        }
        Election election = electionRepository.findById(electionId);
        return election.getCandidateList();
    }

    @Override
    public void patchCandidate(long id, String politicalGroup, Integer listPosition, Election election,
                               String firstName, String lastName, String personalIdNumber,
                               List<VoteResults> voteResultsList) {

        if (!candidateRepository.existsById(id)) {
            throw new CandidateException(CandidateError.CANDIDATE_DOES_NOT_EXISTS);
        }
        Candidate candidate = candidateRepository.findById(id);
        if (Objects.nonNull(politicalGroup)) {
            candidate.setPoliticalGroup(politicalGroup);
        }
        if (Objects.nonNull(listPosition)) {
            candidate.setListPosition(listPosition);
        }
//        if (Objects.nonNull(election)) {
//            candidate.setElection(election);
//        }
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
    }

    @Override
    public long getVoteCount(long id) {
        if (!candidateRepository.existsById(id)) {
            throw new CandidateException(CandidateError.CANDIDATE_DOES_NOT_EXISTS);
        }
        return candidateRepository.findById(id).getVoteResultsList().size();
    }
}
