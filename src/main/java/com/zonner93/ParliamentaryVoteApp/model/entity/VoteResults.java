package com.zonner93.ParliamentaryVoteApp.model.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@Entity
@Table(name = "vote_results")
public class VoteResults {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private long counter;
    @OneToOne(targetEntity = Candidate.class,
            fetch = FetchType.LAZY)
    private Candidate candidate;
}
