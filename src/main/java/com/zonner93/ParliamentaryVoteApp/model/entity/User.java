package com.zonner93.ParliamentaryVoteApp.model.entity;

import com.zonner93.ParliamentaryVoteApp.model.abstracts.Person;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Table(name = "users")
public class User extends Person {

    private String personalIdNumber;
    @ManyToOne(fetch = FetchType.LAZY)
    private Election election;
    private LocalDateTime voteDateTime;
}
