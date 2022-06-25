package com.zonner93.ParliamentaryVoteApp.model.service.user;

import com.zonner93.ParliamentaryVoteApp.model.entity.User;

public interface UserService {
    void createUser(User user);
    void deleteCandidateById(long id);
}
