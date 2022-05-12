package com.zonner93.ParliamentaryVoteApp.model.repository;

import com.zonner93.ParliamentaryVoteApp.model.entity.VoteResults;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VoteResultsRepository extends JpaRepository<VoteResults, Long> {
}
