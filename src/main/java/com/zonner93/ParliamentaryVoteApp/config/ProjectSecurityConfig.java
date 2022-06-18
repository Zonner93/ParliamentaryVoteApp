package com.zonner93.ParliamentaryVoteApp.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;

import javax.servlet.http.HttpServletRequest;
import java.util.Collections;

@Configuration
public class ProjectSecurityConfig {
    @Bean
    SecurityFilterChain defaultSecurityFilterChain(HttpSecurity http) throws Exception {

        http.cors().configurationSource(new CorsConfigurationSource() {
            @Override
            public CorsConfiguration getCorsConfiguration(HttpServletRequest request) {
                CorsConfiguration config = new CorsConfiguration();
                config.setAllowedOrigins(Collections.singletonList("http://localhost:4200"));
                config.setAllowedMethods(Collections.singletonList("*"));
                config.setAllowCredentials(true);
                config.setAllowedHeaders(Collections.singletonList("*"));
                config.setMaxAge(3600L);
                return config;
            }
        }).and().csrf()
                .ignoringAntMatchers("/api/elections/**")
                .ignoringAntMatchers("/api/candidates/**")
                .ignoringAntMatchers("/api/users/**")
                .csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse())
                .and().authorizeHttpRequests((auth) -> auth
                .antMatchers("/api/**").authenticated()
//                TODO: Zrobić widok logowania
                .antMatchers("/login").permitAll()
        ).formLogin().and().httpBasic(Customizer.withDefaults());
        return http.build();

    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

}
