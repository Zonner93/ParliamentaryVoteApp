package com.zonner93.ParliamentaryVoteApp.model.dto;

import com.zonner93.ParliamentaryVoteApp.model.entity.Candidate;
import lombok.Getter;

import java.util.List;

@Getter
public class ElectionDtoInput {
    private String startDate;
    private String endDate;
    private String name;
    private String description;
    private List<Candidate> candidateList;
}
