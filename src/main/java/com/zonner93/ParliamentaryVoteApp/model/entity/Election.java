package com.zonner93.ParliamentaryVoteApp.model.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "elections")
public class Election {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @ManyToMany(targetEntity = Candidate.class,
            fetch = FetchType.LAZY)
    private List<Candidate> candidateList = new ArrayList<>();
    private String name;
    private String description;
    private String startDate;
    private String endDate;
    @OneToMany(fetch = FetchType.LAZY)
    private List<VoteResults> voteResults = new ArrayList<>();
}
