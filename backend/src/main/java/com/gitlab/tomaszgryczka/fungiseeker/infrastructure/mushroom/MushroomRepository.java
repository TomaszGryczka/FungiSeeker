package com.gitlab.tomaszgryczka.fungiseeker.infrastructure.mushroom;

import com.gitlab.tomaszgryczka.fungiseeker.domain.mushroom.Mushroom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MushroomRepository extends JpaRepository<Mushroom, Long> {
}
