package com.zonner93.ParliamentaryVoteApp.model.repository;

import com.zonner93.ParliamentaryVoteApp.model.entity.Election;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ElectionRepository extends JpaRepository<Election, Long> {
}
