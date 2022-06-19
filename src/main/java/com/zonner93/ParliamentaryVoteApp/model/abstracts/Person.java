package com.zonner93.ParliamentaryVoteApp.model.abstracts;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
//@Entity
@MappedSuperclass
public abstract class Person {
    @Id
    @GeneratedValue(strategy = GenerationType.TABLE)
    private long id;
    private String name;
    private String surname;
    private String email;
    private String password;
    private String role;
}
