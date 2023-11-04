package com.gitlab.tomaszgryczka.fungiseeker.domain.coordinates;

import jakarta.persistence.Embeddable;
import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
@Embeddable
public class Coordinates {
    private Double latitude;
    private Double longitude;
}
