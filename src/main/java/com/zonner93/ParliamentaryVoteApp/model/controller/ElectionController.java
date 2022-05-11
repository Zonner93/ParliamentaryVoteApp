package com.zonner93.ParliamentaryVoteApp.model.controller;

import com.zonner93.ParliamentaryVoteApp.model.service.election.ElectionService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class ElectionController {
    private final ElectionService electionService;

    @GetMapping(value = "/election")
    public void createElection(@RequestParam String startDate,
                               @RequestParam String endDate) {
        electionService.createElection(startDate, endDate);
    }

}
