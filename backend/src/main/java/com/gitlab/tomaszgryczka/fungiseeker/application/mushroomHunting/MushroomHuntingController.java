package com.gitlab.tomaszgryczka.fungiseeker.application.mushroomHunting;


import com.gitlab.tomaszgryczka.fungiseeker.application.dtos.MushroomHuntingDTO;
import com.gitlab.tomaszgryczka.fungiseeker.application.dtos.MushroomHuntingEndRequest;
import com.gitlab.tomaszgryczka.fungiseeker.application.dtos.MushroomPredictionDTO;
import com.gitlab.tomaszgryczka.fungiseeker.application.dtos.UpdateInfoDTO;
import com.gitlab.tomaszgryczka.fungiseeker.domain.hunting.MushroomHuntingService;
import com.gitlab.tomaszgryczka.fungiseeker.domain.hunting.MushroomHuntingVisibility;
import com.gitlab.tomaszgryczka.fungiseeker.domain.mushroom.Mushroom;
import com.gitlab.tomaszgryczka.fungiseeker.domain.mushroom.MushroomService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RequiredArgsConstructor
@RequestMapping("/api/mushroom-hunting")
@RestController
public class MushroomHuntingController {

    private final MushroomHuntingService mushroomHuntingService;
    private final MushroomService mushroomService;

    @GetMapping("/active")
    public MushroomHuntingDTO getActiveMushroomHunting() {
        return mushroomHuntingService.getLastActiveMushroomHuntingDto();
    }

    @PostMapping("/deactivate")
    public Long deactivateMushroomHunting(@RequestBody MushroomHuntingEndRequest request) {
        return mushroomHuntingService.deactivateMushroomHunting(request.visibility(), request.users());
    }

    @PostMapping("/addMushroom")
    public MushroomPredictionDTO addMushroomToHunting(@RequestParam("file") MultipartFile file) {
        return mushroomService.addMushroomAndRetrieveMushroomSpeciesList(file);
    }

    @PostMapping("/updateMushroomInfo")
    public Mushroom updateMushroomInfo(@RequestBody UpdateInfoDTO updateInfoDTO) {
        return mushroomService.updateMushroomInfo(updateInfoDTO);
    }

    @GetMapping("/{id}")
    public MushroomHuntingDTO getMushroomHunting(@PathVariable Long id) {
        return mushroomHuntingService.getMushroomHunting(id);
    }

    @DeleteMapping("/deleteMushroom/{id}")
    public void deleteMushroom(@PathVariable Long id) {
        mushroomService.deleteMushroom(id);
    }
}
