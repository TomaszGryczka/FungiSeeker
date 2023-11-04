package com.gitlab.tomaszgryczka.fungiseeker.application.dtos;

import com.gitlab.tomaszgryczka.fungiseeker.domain.hunting.MushroomHuntingStatus;
import jakarta.validation.constraints.NotBlank;
import lombok.Builder;
import lombok.NonNull;

import java.time.LocalDateTime;

@Builder
public record MushroomHuntingCreationResponse(@NonNull Long id,
                                              @NotBlank String name,
                                              String description,
                                              @NonNull LocalDateTime startDate,
                                              @NonNull MushroomHuntingStatus status) {
}
