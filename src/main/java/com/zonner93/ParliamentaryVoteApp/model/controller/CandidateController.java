package com.zonner93.ParliamentaryVoteApp.model.controller;

import com.zonner93.ParliamentaryVoteApp.model.entity.Candidate;
import com.zonner93.ParliamentaryVoteApp.model.entity.Election;
import com.zonner93.ParliamentaryVoteApp.model.service.candidate.CandidateService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/candidates")
public class CandidateController {
    private final CandidateService candidateService;

    @PostMapping()
    public void createCandidate(@RequestBody Candidate candidate,
                                @RequestParam(required = false) long electionId) {
        candidateService.createCandidate(candidate, electionId);
    }
}
