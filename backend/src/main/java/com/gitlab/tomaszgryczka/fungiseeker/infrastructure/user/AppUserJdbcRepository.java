package com.gitlab.tomaszgryczka.fungiseeker.infrastructure.user;

import lombok.RequiredArgsConstructor;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.Collections;

@RequiredArgsConstructor
@Repository
public class AppUserJdbcRepository {

    private final NamedParameterJdbcTemplate jdbcTemplate;

    public AppUser findByAuth0Id(String userAuth0Id) {
        return jdbcTemplate.query(
                "SELECT * FROM app_users WHERE auth0_id = :auth0Id",
                Collections.singletonMap("auth0Id", userAuth0Id),
                new BeanPropertyRowMapper<>(AppUser.class)
        ).get(0);
    }
}
