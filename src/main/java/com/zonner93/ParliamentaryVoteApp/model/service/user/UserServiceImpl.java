package com.zonner93.ParliamentaryVoteApp.model.service.user;

import com.zonner93.ParliamentaryVoteApp.model.entity.User;
import com.zonner93.ParliamentaryVoteApp.model.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    @Override
    public void createUser(User user) {
        userRepository.save(user);
    }
}
