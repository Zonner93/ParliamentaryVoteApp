package com.zonner93.ParliamentaryVoteApp.service.vote;

import org.apache.tomcat.util.net.openssl.ciphers.Authentication;
import org.springframework.stereotype.Service;

@Service
public class VoteServiceImpl implements VoteService {

    @Override
    public void voteForCandidate(long candidateId, Authentication authentication) {

    }
}
