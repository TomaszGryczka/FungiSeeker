package com.gitlab.tomaszgryczka.fungiseeker.application.menu;

import com.gitlab.tomaszgryczka.fungiseeker.application.dtos.MainMenuDTO;
import com.gitlab.tomaszgryczka.fungiseeker.domain.hunting.MushroomHuntingService;
import com.gitlab.tomaszgryczka.fungiseeker.domain.mushroom.MushroomService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RequestMapping("/api")
@RestController
public class MainMenuController {

    private final MushroomService mushroomService;
    private final MushroomHuntingService mushroomHuntingService;

    @GetMapping("/main-menu")
    public MainMenuDTO mainMenu() {
        var mushrooms = mushroomService.getLastTwoMushrooms();
        var mushroomHunting = mushroomHuntingService.getLastTwoMushroomHunting();

        return MainMenuDTO.builder()
                .mushrooms(mushrooms)
                .mushroomHunting(mushroomHunting)
                .build();
    }
}
