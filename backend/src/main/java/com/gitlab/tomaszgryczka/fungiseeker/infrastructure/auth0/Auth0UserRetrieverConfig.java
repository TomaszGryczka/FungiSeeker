package com.gitlab.tomaszgryczka.fungiseeker.infrastructure.auth0;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;

@Configuration
public class Auth0UserRetrieverConfig {

    @Bean(name = "auth0RestTemplate")
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }
}
