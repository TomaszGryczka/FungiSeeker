package com.gitlab.tomaszgryczka.fungiseeker.application.dtos;

import com.gitlab.tomaszgryczka.fungiseeker.domain.hunting.MushroomHuntingVisibility;
import jakarta.validation.constraints.NotNull;

import java.util.List;

public record MushroomHuntingEndRequest(@NotNull MushroomHuntingVisibility visibility,
                                        List<Long> users) {
}
