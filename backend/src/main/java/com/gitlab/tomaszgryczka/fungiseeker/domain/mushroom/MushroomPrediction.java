package com.gitlab.tomaszgryczka.fungiseeker.domain.mushroom;

import jakarta.validation.constraints.NotNull;
import lombok.Builder;

@Builder
public record MushroomPrediction(@NotNull Long mushroomPredictionId,
                                 @NotNull Long mushroomHuntingId,
                                 @NotNull String name,
                                 @NotNull Double probability,
                                 @NotNull String imageUrl,
                                 @NotNull Boolean isEdible,
                                 String description) {
}
