package com.gitlab.tomaszgryczka.fungiseeker.infrastructure.hunting;

import com.gitlab.tomaszgryczka.fungiseeker.domain.hunting.MushroomHunting;
import com.gitlab.tomaszgryczka.fungiseeker.domain.hunting.MushroomHuntingStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.Optional;

@Repository
public interface MushroomHuntingRepository extends JpaRepository<MushroomHunting, Long> {
    Optional<MushroomHunting> findByUserIdAndMushroomHuntingStatus(Long userId, MushroomHuntingStatus status);
    Optional<MushroomHunting> findFirstByUserIdAndMushroomHuntingStatusOrderByStartDateDesc(Long userId, MushroomHuntingStatus status);

    @Query("SELECT mh FROM MushroomHunting mh WHERE mh.userId = ?1 OR mh.id IN (SELECT mh2.id FROM MushroomHunting mh2 JOIN mh2.sharedUsers su WHERE su = ?1)")
    Collection<MushroomHunting> findAllOwnedAndSharedToUser(Long userId);

    Collection<MushroomHunting> findTop2ByUserIdOrderByIdDesc(Long userId);
}
