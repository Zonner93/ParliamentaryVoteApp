package com.zonner93.ParliamentaryVoteApp.model.service.candidate;

import com.zonner93.ParliamentaryVoteApp.model.entity.Candidate;
import com.zonner93.ParliamentaryVoteApp.model.entity.Election;
import com.zonner93.ParliamentaryVoteApp.model.repository.CandidateRepository;
import com.zonner93.ParliamentaryVoteApp.model.repository.ElectionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class CandidateServiceImpl implements CandidateService{
    private final CandidateRepository candidateRepository;
    private final ElectionRepository electionRepository;

    @Override
    public void createCandidate(Candidate candidate, long id) {
        Election election = electionRepository.findById(id);
        if (Objects.nonNull(election)) {
            List<Election> currentCandidateElectionList = candidate.getElectionList();
            currentCandidateElectionList.add(election);
            candidate.setElectionList(currentCandidateElectionList);
        }
        candidateRepository.save(candidate);
        election.getCandidateList().add(candidate);
        electionRepository.save(election);
    }
}
