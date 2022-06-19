package com.zonner93.ParliamentaryVoteApp.service.vote;

import org.apache.tomcat.util.net.openssl.ciphers.Authentication;

public interface VoteService {
    void voteForCandidate(long candidateId, Authentication authentication);
}
