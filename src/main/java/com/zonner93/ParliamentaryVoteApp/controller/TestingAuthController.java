package com.zonner93.ParliamentaryVoteApp.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/test")
public class TestingAuthController {
    @GetMapping()
    public Object currentUserName(Authentication authentication) {
        return authentication.getName();
    }
}
