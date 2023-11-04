package com.gitlab.tomaszgryczka.fungiseeker.application.dtos;

import com.gitlab.tomaszgryczka.fungiseeker.domain.coordinates.Coordinates;
import com.gitlab.tomaszgryczka.fungiseeker.domain.hunting.MushroomHunting;
import com.gitlab.tomaszgryczka.fungiseeker.domain.hunting.MushroomHuntingStatus;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;

public record MushroomHuntingDTO(
        @NotNull Long id,
        @NotBlank String name,
        String description,
        @NotNull LocalDateTime startDate,
        LocalDateTime endDate,
        Coordinates coordinates,
        @NotNull Long userId,
        @NotNull MushroomHuntingStatus status
) {
    public static MushroomHuntingDTO fromMushroomHunting(final MushroomHunting mushroomHunting) {
        return new MushroomHuntingDTO(
                mushroomHunting.getId(),
                mushroomHunting.getName(),
                mushroomHunting.getDescription(),
                mushroomHunting.getStartDate(),
                mushroomHunting.getEndDate(),
                mushroomHunting.getCoordinates(),
                mushroomHunting.getUserId(),
                mushroomHunting.getMushroomHuntingStatus()
        );
    }
}
