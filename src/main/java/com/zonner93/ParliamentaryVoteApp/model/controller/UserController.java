package com.zonner93.ParliamentaryVoteApp.model.controller;

import com.zonner93.ParliamentaryVoteApp.model.entity.User;
import com.zonner93.ParliamentaryVoteApp.model.service.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    @PostMapping()
    public void createUser(@RequestBody User user) {
        user.setRole("ROLE_USER");
        userService.createUser(user);
    }

    @DeleteMapping(path = "/{id}")
    public void deleteUserById(@PathVariable long id) {
        userService.deleteCandidateById(id);
    }
}
