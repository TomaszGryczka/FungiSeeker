package com.gitlab.tomaszgryczka.fungiseeker.infrastructure.jpa;

import com.gitlab.tomaszgryczka.fungiseeker.infrastructure.user.AppUserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.AuditorAware;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Slf4j
@RequiredArgsConstructor
@EnableJpaAuditing
@Component
public class JpaAuditor implements AuditorAware<Long> {

    private static final ThreadLocal<Boolean> disableAuditing = ThreadLocal.withInitial(() -> false);
    private final AppUserService appUserService;

    public static void disableAuditing() {
        disableAuditing.set(true);
    }

    public static void enableAuditing() {
        disableAuditing.set(false);
    }

    @NonNull
    @Override
    public Optional<Long> getCurrentAuditor() {
        if (disableAuditing.get()) {
            return Optional.empty();
        }

        return Optional.of(appUserService.getUserId());
    }


}
