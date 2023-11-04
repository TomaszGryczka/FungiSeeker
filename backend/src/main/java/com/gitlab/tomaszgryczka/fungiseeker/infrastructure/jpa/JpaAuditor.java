package com.gitlab.tomaszgryczka.fungiseeker.infrastructure.jpa;

import com.gitlab.tomaszgryczka.fungiseeker.infrastructure.user.AppUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.AuditorAware;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Component;

import java.util.Optional;

@RequiredArgsConstructor
@EnableJpaAuditing
@Component
public class JpaAuditor implements AuditorAware<Long> {

    private final AppUserService appUserService;

    @NonNull
    @Override
    public Optional<Long> getCurrentAuditor() {
        return Optional.of(appUserService.getUserId());
    }
}
