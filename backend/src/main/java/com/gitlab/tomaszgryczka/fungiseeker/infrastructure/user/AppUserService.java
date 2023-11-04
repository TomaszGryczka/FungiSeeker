package com.gitlab.tomaszgryczka.fungiseeker.infrastructure.user;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class AppUserService {

    private final AppUserRepository appUserRepository;

    @Value("${spring.security.enabled}")
    private boolean securityEnabled;

    public void insertAppUserIfNeeded() {
        if (securityEnabled) {
            final String userAuth0Id = SecurityContextHolder.getContext().getAuthentication().getName();
            final boolean userNotExists = !appUserRepository.existsByAuth0Id(userAuth0Id);

            if (userNotExists) {
                appUserRepository.save(AppUser.builder()
                        .auth0Id(userAuth0Id)
                        .build());
            }
        }
    }

    public Long getUserId() {
        if (securityEnabled) {
            final String userAuth0Id = SecurityContextHolder.getContext().getAuthentication().getName();
            return appUserRepository.findByAuth0Id(userAuth0Id).getId();
        } else {
            return 1L;
        }
    }
}
