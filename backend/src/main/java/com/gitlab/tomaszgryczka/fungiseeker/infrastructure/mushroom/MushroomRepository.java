package com.gitlab.tomaszgryczka.fungiseeker.infrastructure.mushroom;

import com.gitlab.tomaszgryczka.fungiseeker.domain.mushroom.Mushroom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Collection;

@Repository
public interface MushroomRepository extends JpaRepository<Mushroom, Long> {

    Collection<Mushroom> findTop2ByUserIdOrderByIdDesc(Long userId);
}
