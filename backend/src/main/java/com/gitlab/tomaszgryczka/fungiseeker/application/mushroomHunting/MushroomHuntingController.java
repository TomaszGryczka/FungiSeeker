package com.gitlab.tomaszgryczka.fungiseeker.application.mushroomHunting;


import com.gitlab.tomaszgryczka.fungiseeker.application.dtos.MushroomHuntingDTO;
import com.gitlab.tomaszgryczka.fungiseeker.domain.hunting.MushroomHuntingService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RequestMapping("/api/mushroom-hunting")
@RestController
public class MushroomHuntingController {

    private final MushroomHuntingService mushroomHuntingService;

    @GetMapping("/active")
    public MushroomHuntingDTO getActiveMushroomHunting() {
        return mushroomHuntingService.getLastActiveMushroomHunting();
    }
}
