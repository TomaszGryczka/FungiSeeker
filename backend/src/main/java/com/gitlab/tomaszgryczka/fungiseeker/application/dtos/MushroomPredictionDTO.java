package com.gitlab.tomaszgryczka.fungiseeker.application.dtos;

import com.gitlab.tomaszgryczka.fungiseeker.domain.mushroom.MushroomPrediction;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;

import java.util.List;

@Builder
public record MushroomPredictionDTO(@NotNull Long mushroomId,
                                    List<MushroomPrediction> mushroomPredictions) {
}
