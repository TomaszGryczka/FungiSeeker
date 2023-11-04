package com.gitlab.tomaszgryczka.fungiseeker.domain.hunting;

import com.gitlab.tomaszgryczka.fungiseeker.application.dtos.MushroomHuntingCreationResponse;
import com.gitlab.tomaszgryczka.fungiseeker.infrastructure.hunting.MushroomHuntingRepository;
import com.gitlab.tomaszgryczka.fungiseeker.infrastructure.user.AppUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@RequiredArgsConstructor
@Service
public class MushroomHuntingService {

    private final MushroomHuntingRepository mushroomHuntingRepository;
    private final AppUserService appUserService;

    public MushroomHuntingCreationResponse initMushroomHunting(final String name, final String description) {
        validateUserHasNoActiveMushroomHunting();

        final var mushroomHunting = MushroomHunting.builder()
                .name(name)
                .description(description)
                .mushroomHuntingStatus(MushroomHuntingStatus.ACTIVE)
                .build();

        final var savedMushroomHunting = mushroomHuntingRepository.save(mushroomHunting);

        return MushroomHuntingCreationResponse.builder()
                .id(savedMushroomHunting.getId())
                .name(savedMushroomHunting.getName())
                .description(savedMushroomHunting.getDescription())
                .startDate(savedMushroomHunting.getStartDate())
                .status(savedMushroomHunting.getMushroomHuntingStatus())
                .build();
    }

    private void validateUserHasNoActiveMushroomHunting() {
        final Long user = appUserService.getUserId();
        mushroomHuntingRepository.findByUserIdAndMushroomHuntingStatus(user, MushroomHuntingStatus.ACTIVE)
                .ifPresent(mushroomHunting -> {
                    throw new ResponseStatusException(HttpStatus.FORBIDDEN, "User has already active mushroom hunting");
                });
    }
}
