package com.gitlab.tomaszgryczka.fungiseeker.infrastructure.predictor;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;

@Configuration
public class MushroomPredictorConnectorConfig {

    @Bean(name = "predictorRestTemplate")
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }
}
