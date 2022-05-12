package com.zonner93.ParliamentaryVoteApp.model.controller;

import com.zonner93.ParliamentaryVoteApp.model.entity.Election;
import com.zonner93.ParliamentaryVoteApp.model.service.election.ElectionService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class ElectionController {
    private final ElectionService electionService;

    @GetMapping(value = "/election")
    public void createElection(@RequestBody Election election) {
        electionService.createElection(election);
    }

}
