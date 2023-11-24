package com.gitlab.tomaszgryczka.fungiseeker.application;

import com.azure.core.annotation.Get;
import com.gitlab.tomaszgryczka.fungiseeker.application.dtos.StrippedMushroomHuntingDTO;
import com.gitlab.tomaszgryczka.fungiseeker.domain.hunting.HuntingListService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collection;

@RequiredArgsConstructor
@RequestMapping("/api/mushroom-hunting-list")
@RestController
public class MushroomHuntingListController {

    private final HuntingListService huntingListService;

    @GetMapping("/all")
    public Collection<StrippedMushroomHuntingDTO> getAllHuntingAvailableForUser() {
        return huntingListService.getAllHuntingAvailableForUser();
    }
}
