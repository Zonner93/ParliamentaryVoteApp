package com.zonner93.ParliamentaryVoteApp.model.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Table(name = "user_vote_results")
public class UserVotedCandidate {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private long electionId;
    private LocalDateTime timestamp;
}
