package com.zonner93.ParliamentaryVoteApp.model.service.election;

import com.zonner93.ParliamentaryVoteApp.model.entity.Candidate;
import com.zonner93.ParliamentaryVoteApp.model.entity.Election;

import java.util.HashMap;
import java.util.List;

public interface ElectionService {
    void createElection(Election election);
    List<Election> getAllElectionList();
    List<Election> getElectionListByName(String name);
    Election getElectionById(long id);
    void deleteElectionById(long id);
    void patchElection(long id, String name, String description, String startDate, String endDate, List<Candidate> candidateList);
    HashMap<Long, Long> getElectionVoteResults(long id);
}
