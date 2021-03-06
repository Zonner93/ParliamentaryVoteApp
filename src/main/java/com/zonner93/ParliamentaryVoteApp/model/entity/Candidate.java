package com.zonner93.ParliamentaryVoteApp.model.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "candidates")
public class Candidate {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private long electionId;
    private String politicalGroup;
    private Integer listPosition;
    private String firstName;
    private String lastName;
    private String personalIdNumber;
    @OneToMany(cascade=CascadeType.ALL)
    private List<VoteResult> voteResultsList = new ArrayList<>();
}
