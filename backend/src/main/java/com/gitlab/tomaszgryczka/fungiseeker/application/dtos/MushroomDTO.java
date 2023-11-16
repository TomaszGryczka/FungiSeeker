package com.gitlab.tomaszgryczka.fungiseeker.application.dtos;

import com.gitlab.tomaszgryczka.fungiseeker.domain.coordinates.Coordinates;
import com.gitlab.tomaszgryczka.fungiseeker.domain.mushroom.Mushroom;
import lombok.Builder;

import java.util.Objects;
import java.util.Optional;

@Builder
public record MushroomDTO(Long id,
                          String name,
                          String description,
                          String imageUrl,
                          Boolean isEdible,
                          String longitude,
                          String latitude) {

    public static MushroomDTO fromMushroom(final Mushroom mushroom) {
        if (Objects.isNull(mushroom.getName()))
            return null;

        return MushroomDTO.builder()
                .id(mushroom.getId())
                .name(mushroom.getName())
                .description(mushroom.getDescription())
                .imageUrl(mushroom.getImageUrl())
                .isEdible(mushroom.getIsEdible())
                .longitude(Optional.ofNullable(mushroom.getCoordinates()).map(Coordinates::getLongitude).orElse(null))
                .latitude(Optional.ofNullable(mushroom.getCoordinates()).map(Coordinates::getLatitude).orElse(null))
                .build();
    }
}
