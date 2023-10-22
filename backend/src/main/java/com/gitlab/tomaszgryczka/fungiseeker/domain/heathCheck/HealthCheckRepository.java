package com.gitlab.tomaszgryczka.fungiseeker.domain.heathCheck;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HealthCheckRepository extends JpaRepository<HealthCheck, Long> {
}
