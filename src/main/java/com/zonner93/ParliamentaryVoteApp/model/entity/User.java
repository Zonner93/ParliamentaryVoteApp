package com.zonner93.ParliamentaryVoteApp.model.entity;

import com.zonner93.ParliamentaryVoteApp.model.abstracts.Person;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "users")
public class User extends Person {
    private String personalIdNumber;
    @OneToMany(cascade = CascadeType.ALL)
    private List<VoteResult> voteResults = new ArrayList<>();
}
