package com.gitlab.tomaszgryczka.fungiseeker.domain.heathCheck;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "health_check")
public class HealthCheck {

    @Id
    private Long id;
    private String responseCode;
}
