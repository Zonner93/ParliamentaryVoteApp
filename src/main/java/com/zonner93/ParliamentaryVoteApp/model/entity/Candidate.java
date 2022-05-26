package com.zonner93.ParliamentaryVoteApp.model.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "candidates")
public class Candidate {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String politicalGroup;
    private int listPosition;
    @ManyToOne
    private Election election;
    private String firstName;
    private String lastName;
    private String personalIdNumber;
    @OneToMany
    private List<VoteResults> voteResultsList;
}
