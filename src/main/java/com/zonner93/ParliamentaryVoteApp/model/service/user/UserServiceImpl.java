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
//        TODO: zabezpieczenie przed utworzniem 2 userów o tym samym mailu
//        TODO: validacja czy hasło ma zadaną długość, znak specjalny, litery cyfry
        userRepository.save(user);
    }
}