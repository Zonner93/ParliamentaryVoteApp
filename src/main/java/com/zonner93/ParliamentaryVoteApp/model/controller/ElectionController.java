package com.zonner93.ParliamentaryVoteApp.model.controller;

import com.zonner93.ParliamentaryVoteApp.model.entity.Election;
import com.zonner93.ParliamentaryVoteApp.model.service.election.ElectionService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/election")
public class ElectionController {
    private final ElectionService electionService;

    @PostMapping()
    public void createElection(@RequestBody Election election) {
        electionService.createElection(election);
    }

    @GetMapping(path = "/{id}")
    public Election getElectionById(@PathVariable long id) {
        return electionService.getElectionById(id);
    }

    @GetMapping("/all")
    public List<Election> getAllElectionList() {
        return electionService.getAllElectionList();
    }

    @GetMapping
    public List<Election> getElectionListByNameContaining(@RequestParam String name) {
        return electionService.getAllElectionByName(name);
    }

    @DeleteMapping(path = "/{id}")
    public void deleteElectionById(@PathVariable long id) {

    }
}
