package com.gitlab.tomaszgryczka.fungiseeker.domain.mushroom;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonUnwrapped;
import com.gitlab.tomaszgryczka.fungiseeker.domain.coordinates.Coordinates;
import com.gitlab.tomaszgryczka.fungiseeker.domain.hunting.MushroomHunting;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder(toBuilder = true)
@EntityListeners(AuditingEntityListener.class)
@Entity
@Table(name = "mushroom")
public class Mushroom {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "mushroom_id_seq")
    @SequenceGenerator(name = "mushroom_id_seq", sequenceName = "mushroom_id_seq", allocationSize = 1)
    private Long id;

    private Long speciesId;

    private String name;
    private String description;
    private Boolean isEdible;
    private String imageUrl;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "mushroom_hunting_id")
    @JsonBackReference
    private MushroomHunting mushroomHunting;

    private Long userId;

    @Embedded
    @JsonUnwrapped
    private Coordinates coordinates;
}
