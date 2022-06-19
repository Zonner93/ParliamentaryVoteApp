package com.zonner93.ParliamentaryVoteApp.controller;

import com.zonner93.ParliamentaryVoteApp.service.vote.VoteService;
import lombok.RequiredArgsConstructor;
import org.apache.tomcat.util.net.openssl.ciphers.Authentication;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/vote")
public class VoteController {

    private final VoteService voteService;

    @PostMapping(value = "/candidates/{candidateId}")
    public void voteForCandidate(@PathVariable long candidateId,
                                 Authentication authentication) {

    }
}
