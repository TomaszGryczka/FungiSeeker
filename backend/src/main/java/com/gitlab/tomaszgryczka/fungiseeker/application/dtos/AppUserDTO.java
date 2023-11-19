package com.gitlab.tomaszgryczka.fungiseeker.application.dtos;

import jakarta.validation.constraints.NotNull;
import lombok.Builder;

@Builder
public record AppUserDTO(@NotNull Long id,
                         @NotNull String name,
                         @NotNull String nickname) {
}
