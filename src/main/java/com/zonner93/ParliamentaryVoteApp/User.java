package com.zonner93.ParliamentaryVoteApp;

import com.zonner93.ParliamentaryVoteApp.model.abstracts.Person;
import com.zonner93.ParliamentaryVoteApp.model.entity.Election;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
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
