package com.gitlab.tomaszgryczka.fungiseeker.application.mushroomHunting;


import com.gitlab.tomaszgryczka.fungiseeker.application.dtos.*;
import com.gitlab.tomaszgryczka.fungiseeker.domain.hunting.MushroomHuntingService;
import com.gitlab.tomaszgryczka.fungiseeker.domain.hunting.MushroomHuntingVisibility;
import com.gitlab.tomaszgryczka.fungiseeker.domain.labels.MushroomLabels;
import com.gitlab.tomaszgryczka.fungiseeker.domain.mushroom.Mushroom;
import com.gitlab.tomaszgryczka.fungiseeker.domain.mushroom.MushroomService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

import static java.util.stream.Collectors.toList;

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

    @GetMapping("/all-mushrooms")
    public List<MushroomLabelDTO> getAllMushrooms() {
        return MushroomLabels.mushrooms.entrySet().stream()
                .map(entry -> MushroomLabelDTO.fromMushroomLabel(entry.getKey(), entry.getValue()))
                .toList();
    }
}
