package com.gitlab.tomaszgryczka.fungiseeker.domain.hunting;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.gitlab.tomaszgryczka.fungiseeker.domain.coordinates.Coordinates;
import com.gitlab.tomaszgryczka.fungiseeker.domain.mushroom.Mushroom;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@EntityListeners(AuditingEntityListener.class)
@Entity
@Table(name = "mushroom_hunting")
public class MushroomHunting {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "mushroom_hunting_id_seq")
    @SequenceGenerator(name = "mushroom_hunting_id_seq", sequenceName = "mushroom_hunting_id_seq", allocationSize = 1)
    private Long id;

    private String name;
    private String description;

    @CreatedDate
    private LocalDateTime startDate;
    private LocalDateTime endDate;

    @Embedded
    private Coordinates coordinates;

    @CreatedBy
    private Long userId;

    @Column(name = "status")
    @Enumerated(EnumType.STRING)
    private MushroomHuntingStatus mushroomHuntingStatus;

    @OneToMany(mappedBy = "mushroomHunting", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<Mushroom> mushrooms;
}
