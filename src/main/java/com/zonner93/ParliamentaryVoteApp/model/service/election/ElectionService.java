package com.zonner93.ParliamentaryVoteApp.model.service.election;

import com.zonner93.ParliamentaryVoteApp.model.dto.ElectionDtoInput;
import com.zonner93.ParliamentaryVoteApp.model.entity.Election;

import java.util.HashMap;
import java.util.List;

public interface ElectionService {
    void createElection(ElectionDtoInput electionDtoInput);

    List<Election> getAllElectionList();
    List<Election> getActiveElectionList();

    List<Election> getElectionListByName(String name);

    Election getElectionById(long id);

    void deleteElectionById(long id);

    void patchElection(long id, ElectionDtoInput electionDtoInput);

    HashMap<Long, Long> getElectionVoteResults(long id);

    void addCandidate(long electionId, long candidateId);

    void removeCandidate(long electionId, long candidateId);
}
