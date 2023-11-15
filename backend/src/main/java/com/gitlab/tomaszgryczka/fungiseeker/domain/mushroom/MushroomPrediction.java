package com.gitlab.tomaszgryczka.fungiseeker.domain.mushroom;

import jakarta.validation.constraints.NotNull;
import lombok.Builder;

@Builder
public record MushroomPrediction(@NotNull Long mushroomHuntingId,
                                 @NotNull String name,
                                 @NotNull Double probability) {
}
