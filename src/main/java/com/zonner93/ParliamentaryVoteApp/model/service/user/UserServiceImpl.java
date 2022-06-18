package com.zonner93.ParliamentaryVoteApp.model.service.user;

import com.zonner93.ParliamentaryVoteApp.model.entity.User;
import com.zonner93.ParliamentaryVoteApp.model.exception.user.UserError;
import com.zonner93.ParliamentaryVoteApp.model.exception.user.UserException;
import com.zonner93.ParliamentaryVoteApp.model.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    @Override
    public void createUser(User user) {
//        TODO: validacja czy email jest poprawny
//        TODO: validacja czy hasło ma zadaną długość, znak specjalny, litery cyfry

//        TODO: zahashowanie hasła
        validateIfUserAlreadyExistsByEmail(user.getEmail());
        userRepository.save(user);
    }

    protected void validateIfUserAlreadyExistsByEmail(String userEmail) {
        List<User> userList = userRepository.findByEmail(userEmail);
        if (Objects.nonNull(userList)) {
            throw new UserException(UserError.USER_WITH_EMAIL_PROVIDED_ALREADY_EXISTS);
        }
    }
}
