package com.gitlab.tomaszgryczka.fungiseeker.domain.mushroom;

import com.gitlab.tomaszgryczka.fungiseeker.domain.coordinates.Coordinates;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@EntityListeners(AuditingEntityListener.class)
@Entity
@Table(name = "mushroom")
public class Mushroom {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "mushroom_id_seq")
    @SequenceGenerator(name = "mushroom_id_seq", sequenceName = "mushroom_id_seq", allocationSize = 1)
    private Long id;

    private String name;
    private String description;
    private Boolean isEdible;
    private String imageUrl;

    private Long mushroomHuntingId;
    private Long userId;

    @Embedded
    private Coordinates coordinates;
}
