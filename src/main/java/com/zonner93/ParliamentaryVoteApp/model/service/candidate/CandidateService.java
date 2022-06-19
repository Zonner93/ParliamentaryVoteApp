package com.zonner93.ParliamentaryVoteApp.model.service.candidate;

import com.zonner93.ParliamentaryVoteApp.model.entity.Candidate;
import org.springframework.security.core.Authentication;

import java.util.List;

public interface CandidateService {
    void createCandidate(Candidate candidate);

    void deleteCandidate(long id);

    Candidate getCandidate(long id);

    List<Candidate> getElectionCandidates(long electionId);

    void patchCandidate(long id, Candidate candidate);

    long getVoteCount(long id);

    List<Candidate> getAllCandidates();

    void voteForCandidate(long id, Authentication authentication);
}
