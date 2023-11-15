package com.gitlab.tomaszgryczka.fungiseeker.infrastructure.user;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AppUserRepository extends JpaRepository<AppUser, Long> {
    boolean existsByAuth0Id(String userAuth0Id);
}
