package com.gitlab.tomaszgryczka.fungiseeker.infrastructure.hunting;

import com.gitlab.tomaszgryczka.fungiseeker.domain.hunting.MushroomHunting;
import com.gitlab.tomaszgryczka.fungiseeker.domain.hunting.MushroomHuntingStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MushroomHuntingRepository extends JpaRepository<MushroomHunting, Long> {
    Optional<MushroomHunting> findByUserIdAndMushroomHuntingStatus(Long userId, MushroomHuntingStatus status);
    Optional<MushroomHunting> findFirstByUserIdAndMushroomHuntingStatusOrderByStartDateDesc(Long userId, MushroomHuntingStatus status);
}
