package com.gitlab.tomaszgryczka.fungiseeker.application.dtos;

import lombok.Builder;

import java.util.Collection;

@Builder
public record MainMenuDTO(
        Collection<MushroomDTO> mushrooms,
        Collection<MushroomHuntingDTO> mushroomHunting
) {
}
