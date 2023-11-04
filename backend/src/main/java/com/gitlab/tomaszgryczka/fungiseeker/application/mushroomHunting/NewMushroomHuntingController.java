package com.gitlab.tomaszgryczka.fungiseeker.application.mushroomHunting;


import com.gitlab.tomaszgryczka.fungiseeker.application.dtos.MushroomHuntingCreationRequest;
import com.gitlab.tomaszgryczka.fungiseeker.domain.hunting.MushroomHuntingService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RequestMapping("/api/new-mushroom-hunting")
@RestController
public class NewMushroomHuntingController {

    private final MushroomHuntingService mushroomHuntingService;

    @PostMapping("/create")
    public Long createNewMushroomHunting(@RequestBody MushroomHuntingCreationRequest request) {
        return mushroomHuntingService.createMushroomHunting(request.name(), request.description());
    }
}
