package com.gitlab.tomaszgryczka.fungiseeker.domain.hunting;

import com.gitlab.tomaszgryczka.fungiseeker.application.dtos.StrippedMushroomHuntingDTO;
import com.gitlab.tomaszgryczka.fungiseeker.infrastructure.hunting.MushroomHuntingRepository;
import com.gitlab.tomaszgryczka.fungiseeker.infrastructure.user.AppUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.Objects;

@RequiredArgsConstructor
@Service
public class HuntingListService {

    private final AppUserService appUserService;
    private final MushroomHuntingRepository mushroomHuntingRepository;

    public Collection<StrippedMushroomHuntingDTO> getAllHuntingAvailableForUser() {
        final Long userId = appUserService.getUserId();
        return retrieveAllHuntingAvailableForUser(userId).stream()
                .filter(mushroomHunting -> !Objects.equals(mushroomHunting.id(), 0L))
                .toList();
    }

    public Collection<StrippedMushroomHuntingDTO> getAllHuntingAvailableForUser(Long userId) {
        return retrieveAllHuntingAvailableForUser(userId);
    }

    private Collection<StrippedMushroomHuntingDTO> retrieveAllHuntingAvailableForUser(Long userId) {
        return this.mushroomHuntingRepository.findAllOwnedAndSharedToUser(userId)
                .stream()
                .map(StrippedMushroomHuntingDTO::fromMushroomHunting)
                .toList();
    }
}
