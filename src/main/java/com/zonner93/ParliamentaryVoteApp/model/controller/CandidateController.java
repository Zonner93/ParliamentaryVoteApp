package com.zonner93.ParliamentaryVoteApp.model.controller;

import com.zonner93.ParliamentaryVoteApp.model.entity.Candidate;
import com.zonner93.ParliamentaryVoteApp.model.entity.Election;
import com.zonner93.ParliamentaryVoteApp.model.entity.VoteResults;
import com.zonner93.ParliamentaryVoteApp.model.service.candidate.CandidateService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/candidates")
public class CandidateController {
    private final CandidateService candidateService;

    @PostMapping()
    public void createCandidate(@RequestBody Candidate candidate) {
        candidateService.createCandidate(candidate);
    }

    @DeleteMapping(path = "/{id}")
    public void deleteCandidateById(@PathVariable long id) {
        candidateService.deleteCandidate(id);
    }

    @GetMapping(path = "/{electionId}")
    public List<Candidate> getElectionCandidates(@PathVariable long electionId) {
        return candidateService.getElectionCandidates(electionId);
    }

    @PatchMapping(path = "/{id}")
    public void patchCandidate(@PathVariable long id,
                               @RequestParam(required = false) String politicalGroup,
                               @RequestParam(required = false) Integer listPosition,
                               @RequestParam(required = false) Election election,
                               @RequestParam(required = false) String firstName,
                               @RequestParam(required = false) String lastName,
                               @RequestParam(required = false) String personalIdNumber,
                               @RequestParam(required = false) List<VoteResults> voteResultsList) {
        candidateService.patchCandidate(id, politicalGroup, listPosition, election, firstName, lastName,
                personalIdNumber, voteResultsList);
    }
}
