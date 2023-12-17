package com.gitlab.tomaszgryczka.fungiseeker.application.dtos;

import com.gitlab.tomaszgryczka.fungiseeker.domain.coordinates.Coordinates;
import com.gitlab.tomaszgryczka.fungiseeker.domain.hunting.MushroomHunting;
import com.gitlab.tomaszgryczka.fungiseeker.domain.hunting.MushroomHuntingStatus;
import com.gitlab.tomaszgryczka.fungiseeker.domain.hunting.MushroomHuntingVisibility;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;

public record MushroomHuntingDTO(
        @NotNull Long id,
        @NotBlank String name,
        String description,
        @NotNull LocalDateTime startDate,
        LocalDateTime endDate,
        Coordinates coordinates,
        @NotNull Long userId,
        @NotNull MushroomHuntingStatus status,

        MushroomHuntingVisibility visibility,
        List<MushroomDTO> mushrooms
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
                mushroomHunting.getMushroomHuntingStatus(),
                mushroomHunting.getVisibility(),
                mushroomHunting.getMushrooms().stream()
                        .map(MushroomDTO::fromMushroom)
                        .filter(Objects::nonNull)
                        .toList()
        );
    }
}
