package com.zonner93.ParliamentaryVoteApp.model.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
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
    private String politicalGroup;
    private Integer listPosition;
//    @ManyToOne(cascade=CascadeType.ALL)
//    private Election election;
    private String firstName;
    private String lastName;
    private String personalIdNumber;
    @OneToMany
    private List<VoteResults> voteResultsList = new ArrayList<>();
}
