package com.gitlab.tomaszgryczka.fungiseeker.infrastructure.user;

import com.gitlab.tomaszgryczka.fungiseeker.application.dtos.AppUserDTO;
import com.gitlab.tomaszgryczka.fungiseeker.infrastructure.auth0.Auth0User;
import com.gitlab.tomaszgryczka.fungiseeker.infrastructure.auth0.Auth0UserRetriever;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.stream.Collectors;


@RequiredArgsConstructor
@Service
public class AppUserService {

    private final AppUserRepository appUserRepository;
    private final AppUserJdbcRepository appUserJdbcRepository;
    private final Auth0UserRetriever auth0UserRetriever;

    @Value("${spring.security.enabled}")
    private boolean securityEnabled;

    public void insertAppUserIfNeeded() {
        if (securityEnabled) {
            final String userAuth0Id = SecurityContextHolder.getContext().getAuthentication().getName();
            final boolean userNotExists = !appUserRepository.existsByAuth0Id(userAuth0Id);

            if (userNotExists) {
                final Auth0User auth0User = auth0UserRetriever.getUserInfoFromAuth0();

                appUserRepository.save(AppUser.builder()
                        .auth0Id(userAuth0Id)
                        .name(auth0User.name())
                        .nickname(auth0User.nickname())
                        .build());
            }
        }
    }

    public Long getUserId() {
        if (securityEnabled) {
            final String userAuth0Id = SecurityContextHolder.getContext().getAuthentication().getName();
            return appUserJdbcRepository.findByAuth0Id(userAuth0Id).getId();
        } else {
            return 1L;
        }
    }

    public Collection<AppUserDTO> getAllUsers() {
        final Long selfUserId = getUserId();

        return appUserRepository.findAll().stream()
                .filter(appUser -> !appUser.getId().equals(selfUserId))
                .map(appUser -> AppUserDTO.builder()
                        .id(appUser.getId())
                        .name(appUser.getName())
                        .nickname(appUser.getNickname())
                        .build())
                .collect(Collectors.toList());
    }

    public AppUserDTO getMe() {
        final Long selfUserId = getUserId();

        return appUserRepository.findById(selfUserId)
                .map(appUser -> AppUserDTO.builder()
                        .id(appUser.getId())
                        .name(appUser.getName())
                        .nickname(appUser.getNickname())
                        .build())
                .orElse(null);
    }

    public String getUserNameById(Long userId) {
        return appUserRepository.findById(userId).map(AppUser::getName).orElse(null);
    }

    public AppUser getAppUserByAuth0Id(String auth0Id) {
        return appUserRepository.findByAuth0Id(auth0Id);
    }
}
