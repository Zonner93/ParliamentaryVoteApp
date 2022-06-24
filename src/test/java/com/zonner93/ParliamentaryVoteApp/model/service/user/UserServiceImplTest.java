package com.zonner93.ParliamentaryVoteApp.model.service.user;

import com.zonner93.ParliamentaryVoteApp.model.entity.User;
import com.zonner93.ParliamentaryVoteApp.model.exception.user.UserException;
import com.zonner93.ParliamentaryVoteApp.model.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

class UserServiceImplTest {
    private UserServiceImpl userService;
    @Mock
    private UserRepository userRepository;

    @BeforeEach
    void initializeUserService() {
        userService = new UserServiceImpl(userRepository);
    }

    @Test
    void shouldThrowUserExceptionWhenUserAlreadyExists() {
//        given
        User user = new User();
        user.setName("Jan");
        user.setSurname("Kowalski");
        user.setEmail("jan.kowalski@email.com");
        user.setRole("ROLE_USER");

        List<User> userList = new ArrayList<>();
//        userList.add(user);

        String expectedMessage = "Email is already used!";

//        when
        UserException userException = assertThrows(UserException.class,
                () -> userService.validateIfUserAlreadyExistsByEmail("jan.kowalski@email.com"));
//        then
        assertAll(
                () -> assertTrue(userException.getUserError().getMessage().contains(expectedMessage))
        );
    }
}