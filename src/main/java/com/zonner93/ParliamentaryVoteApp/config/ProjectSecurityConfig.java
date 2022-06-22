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
                .ignoringAntMatchers("/api/vote/candidates/**")
                .csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse())
                .and().authorizeHttpRequests((auth) -> auth
                        .antMatchers("/api/elections/**").hasAnyRole("ADMIN", "USER")
                        .antMatchers("/api/candidates/vote/**").hasAnyRole("ADMIN", "USER")
                        .antMatchers("/api/candidates/**").hasAnyRole("ADMIN", "USER")
                        .antMatchers("/api/vote/candidates/**").hasAnyRole("ADMIN", "USER")
//                        .authenticated()
                        .antMatchers("/login").permitAll()
        ).formLogin().and().httpBasic(Customizer.withDefaults()).logout();
        return http.build();

    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

}
