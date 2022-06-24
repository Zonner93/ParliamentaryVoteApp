package com.zonner93.ParliamentaryVoteApp.model.controller;

import com.zonner93.ParliamentaryVoteApp.model.dto.ElectionDtoInput;
import com.zonner93.ParliamentaryVoteApp.model.entity.Election;
import com.zonner93.ParliamentaryVoteApp.model.service.election.ElectionService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/elections")
public class ElectionController {
    private final ElectionService electionService;

    @PostMapping()
    public void createElection(@RequestBody ElectionDtoInput electionDtoInput) {
        electionService.createElection(electionDtoInput);
    }

    @GetMapping(path = "/{id}")
    public Election getElectionById(@PathVariable long id) {
        return electionService.getElectionById(id);
    }

    @GetMapping("/active")
    public List<Election> getActiveElectionList() {
        return electionService.getActiveElectionList();
    }

    @GetMapping("/finished")
    public List<Election> getFinishedElectionList() {
        return electionService.getFinishedElectionList();
    }


    @GetMapping("/all")
    public List<Election> getAllElectionList() {
        return electionService.getAllElectionList();
    }

    @GetMapping
    public List<Election> getElectionListByNameContaining(@RequestParam String name) {
        return electionService.getElectionListByName(name);
    }

    @PatchMapping(path = "/{id}")
    public void patchElection(@PathVariable long id,
                              @RequestBody ElectionDtoInput electionDtoInput) {
        electionService.patchElection(id, electionDtoInput);
    }

    @DeleteMapping(path = "/{id}")
    public void deleteElectionById(@PathVariable long id) {
        electionService.deleteElectionById(id);
    }

    @GetMapping(path = "/vote-results/{id}")
    public HashMap<Long, Long> getElectionVoteResults(@PathVariable long id) {
        return electionService.getElectionVoteResults(id);
    }

    @PostMapping(path = "/{electionId}/add-candidate")
    public void addCandidate(@PathVariable long electionId,
                             @RequestParam long candidateId) {
        electionService.addCandidate(electionId, candidateId);
    }

    @PatchMapping(path = "/{electionId}/remove-candidate")
    public void removeCandidate(@PathVariable long electionId,
                                @RequestParam long candidateId) {
        electionService.removeCandidate(electionId, candidateId);
    }
}
