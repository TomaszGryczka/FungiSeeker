package com.gitlab.tomaszgryczka.fungiseeker.application.dtos;

import com.gitlab.tomaszgryczka.fungiseeker.domain.coordinates.Coordinates;
import lombok.Builder;
import lombok.NonNull;

@Builder
public record PlaceSearchDTO(@NonNull String userName,
                             @NonNull String mushrooms,
                             @NonNull String googleMapLink,
                             @NonNull Coordinates coordinates) {
}
