package com.gitlab.tomaszgryczka.fungiseeker.application.dtos;

import jakarta.validation.constraints.NotBlank;

public record MushroomHuntingCreationRequest(@NotBlank String name,
                                             String description) {
}
