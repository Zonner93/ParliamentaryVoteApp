package com.zonner93.ParliamentaryVoteApp.model.service.user;

import com.zonner93.ParliamentaryVoteApp.model.entity.User;
import com.zonner93.ParliamentaryVoteApp.model.exception.user.UserError;
import com.zonner93.ParliamentaryVoteApp.model.exception.user.UserException;
import com.zonner93.ParliamentaryVoteApp.model.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    @Override
    public void createUser(User user) {
//        TODO: validacja czy email jest poprawny
        String userPassword = user.getPassword();
        validatePasswordLength(userPassword);
        validateIfUserAlreadyExistsByEmail(user.getEmail());
        String hashedPassword = BCrypt.hashpw(userPassword, BCrypt.gensalt(12));
        user.setPassword(hashedPassword);
        userRepository.save(user);
    }

    protected void validateIfUserAlreadyExistsByEmail(String userEmail) {
        List<User> userList = userRepository.findByEmail(userEmail);
        if (!userList.isEmpty()) {
            throw new UserException(UserError.USER_WITH_EMAIL_PROVIDED_ALREADY_EXISTS);
        }
    }

    protected void validatePasswordLength(String password) {
        if (password.length() < 8) {
            throw new UserException(UserError.PASSWORD_IS_TOO_SHORT);
        }
    }
}
