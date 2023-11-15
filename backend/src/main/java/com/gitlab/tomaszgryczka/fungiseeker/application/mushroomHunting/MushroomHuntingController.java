package com.gitlab.tomaszgryczka.fungiseeker.application.mushroomHunting;


import com.gitlab.tomaszgryczka.fungiseeker.application.dtos.MushroomHuntingDTO;
import com.gitlab.tomaszgryczka.fungiseeker.application.dtos.MushroomPredictionDTO;
import com.gitlab.tomaszgryczka.fungiseeker.domain.hunting.MushroomHuntingService;
import com.gitlab.tomaszgryczka.fungiseeker.domain.mushroom.MushroomPrediction;
import com.gitlab.tomaszgryczka.fungiseeker.domain.mushroom.MushroomService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RequiredArgsConstructor
@RequestMapping("/api/mushroom-hunting")
@RestController
public class MushroomHuntingController {

    private final MushroomHuntingService mushroomHuntingService;
    private final MushroomService mushroomService;

    @GetMapping("/active")
    public MushroomHuntingDTO getActiveMushroomHunting() {
        return mushroomHuntingService.getLastActiveMushroomHunting();
    }

    @PostMapping("/deactivate")
    public Long deactivateMushroomHunting() {
        return mushroomHuntingService.deactivateMushroomHunting();
    }

    @PostMapping("/addMushroom")
    public MushroomPredictionDTO addMushroomToHunting(@RequestParam("file") MultipartFile file) {
        return mushroomService.addMushroomAndRetrieveMushroomSpeciesList(file);
    }
}
