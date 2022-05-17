package com.zonner93.ParliamentaryVoteApp.model.service.election;

import com.zonner93.ParliamentaryVoteApp.model.entity.Election;

import java.util.List;

public interface ElectionService {
    public void createElection(Election election);
    public List<Election> getAllElectionList();
    public List<Election> getElectionListByName(String name);
    public Election getElectionById(long id);
    public void deleteElectionById(long id);
}
