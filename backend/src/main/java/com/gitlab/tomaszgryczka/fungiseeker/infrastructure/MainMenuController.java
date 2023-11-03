package com.gitlab.tomaszgryczka.fungiseeker.infrastructure;

import com.gitlab.tomaszgryczka.fungiseeker.domain.heathCheck.HealthCheckRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RequestMapping("/api")
@RestController
public class MainMenuController {

    private final HealthCheckRepository healthCheckRepository;

    @GetMapping("/main-menu")
    public String mainMenu() {
        return healthCheckRepository.getReferenceById(1L).getResponseCode();
    }
}
