package com.gitlab.tomaszgryczka.fungiseeker.application.dtos;

import com.gitlab.tomaszgryczka.fungiseeker.domain.coordinates.Coordinates;
import com.gitlab.tomaszgryczka.fungiseeker.domain.hunting.MushroomHunting;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record StrippedMushroomHuntingDTO(
        @NotNull Long id,
        @NotBlank String name,
        String description,
        Coordinates coordinates,
        @NotNull Long userId
) {
    public static StrippedMushroomHuntingDTO fromMushroomHunting(final MushroomHunting mushroomHunting) {
        return new StrippedMushroomHuntingDTO(
                mushroomHunting.getId(),
                mushroomHunting.getName(),
                mushroomHunting.getDescription(),
                mushroomHunting.getCoordinates(),
                mushroomHunting.getUserId()
        );
    }
}
