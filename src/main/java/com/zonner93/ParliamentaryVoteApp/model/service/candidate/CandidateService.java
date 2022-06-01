package com.zonner93.ParliamentaryVoteApp.model.service.candidate;

import com.zonner93.ParliamentaryVoteApp.model.entity.Candidate;
import com.zonner93.ParliamentaryVoteApp.model.entity.Election;
import com.zonner93.ParliamentaryVoteApp.model.entity.VoteResults;

import java.util.List;

public interface CandidateService {
    void createCandidate(Candidate candidate);

    void deleteCandidate(long id);

    Candidate getCandidate(long id);

    List<Candidate> getElectionCandidates(long electionId);

    void patchCandidate(long id, String politicalGroup, Integer listPosition, Election election,
                        String firstName, String lastName, String personalIdNumber, List<VoteResults> voteResultsList);

    long getVoteCount(long id);
}
