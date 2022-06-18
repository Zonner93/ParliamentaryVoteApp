package com.zonner93.ParliamentaryVoteApp.model.repository;

import com.zonner93.ParliamentaryVoteApp.model.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
}
