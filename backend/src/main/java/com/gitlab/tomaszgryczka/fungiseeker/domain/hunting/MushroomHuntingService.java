package com.gitlab.tomaszgryczka.fungiseeker.domain.hunting;

import com.gitlab.tomaszgryczka.fungiseeker.application.dtos.MushroomHuntingDTO;
import com.gitlab.tomaszgryczka.fungiseeker.infrastructure.hunting.MushroomHuntingRepository;
import com.gitlab.tomaszgryczka.fungiseeker.infrastructure.user.AppUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.Objects;

@RequiredArgsConstructor
@Service
public class MushroomHuntingService {

    private final MushroomHuntingRepository mushroomHuntingRepository;
    private final AppUserService appUserService;

    public Long createMushroomHunting(final String name, final String description) {
        validateUserHasNoActiveMushroomHunting();

        final var mushroomHunting = MushroomHunting.builder()
                .name(name)
                .description(description)
                .mushroomHuntingStatus(MushroomHuntingStatus.ACTIVE)
                .build();

        final var savedMushroomHunting = mushroomHuntingRepository.save(mushroomHunting);

        return savedMushroomHunting.getId();
    }

    public MushroomHuntingDTO getLastActiveMushroomHuntingDto() {
        final Long userId = appUserService.getUserId();
        final var mushroomHunting =
                mushroomHuntingRepository.findFirstByUserIdAndMushroomHuntingStatusOrderByStartDateDesc(
                        userId,
                        MushroomHuntingStatus.ACTIVE
                );

        return mushroomHunting.map(MushroomHuntingDTO::fromMushroomHunting).orElse(null);
    }

    public MushroomHunting getLastActiveMushroomHunting() {
        final Long userId = appUserService.getUserId();

        return mushroomHuntingRepository.findFirstByUserIdAndMushroomHuntingStatusOrderByStartDateDesc(
                        userId,
                        MushroomHuntingStatus.ACTIVE
                )
                .orElse(null);
    }

    public Long deactivateMushroomHunting(final MushroomHuntingVisibility visibility) {
        if (Objects.isNull(visibility)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Visibility cannot be null");
        }
        
        final Long userId = appUserService.getUserId();
        final var mushroomHunting =
                mushroomHuntingRepository.findFirstByUserIdAndMushroomHuntingStatusOrderByStartDateDesc(
                        userId,
                        MushroomHuntingStatus.ACTIVE
                );

        mushroomHunting.ifPresent(mh -> {
                    mh.setMushroomHuntingStatus(MushroomHuntingStatus.FINISHED);
                    mh.setEndDate(LocalDateTime.now());
                    mh.setVisibility(visibility);
                    mushroomHuntingRepository.save(mh);
                }
        );

        return mushroomHunting.map(MushroomHunting::getId).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User has no active mushroom hunting"));
    }

    private void validateUserHasNoActiveMushroomHunting() {
        final Long userId = appUserService.getUserId();
        mushroomHuntingRepository.findByUserIdAndMushroomHuntingStatus(userId, MushroomHuntingStatus.ACTIVE)
                .ifPresent(mushroomHunting -> {
                    throw new ResponseStatusException(HttpStatus.FORBIDDEN, "User has already active mushroom hunting");
                });
    }
}
