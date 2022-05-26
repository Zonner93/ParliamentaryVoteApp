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
public class Candidate extends User {
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private long id;
    private String politicalGroup;
    @ManyToMany(targetEntity = Election.class,
            fetch = FetchType.LAZY)
    private List<Election> electionList = new ArrayList<>();
}
