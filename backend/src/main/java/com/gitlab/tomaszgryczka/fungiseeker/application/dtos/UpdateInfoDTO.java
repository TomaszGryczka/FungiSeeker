package com.gitlab.tomaszgryczka.fungiseeker.application.dtos;

import jakarta.validation.constraints.NotNull;

public record UpdateInfoDTO(String description,
                            @NotNull MushroomPredictionDTO mushroomPrediction) {
}
