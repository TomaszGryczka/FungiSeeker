package com.gitlab.tomaszgryczka.fungiseeker.domain.hunting;

import com.gitlab.tomaszgryczka.fungiseeker.application.dtos.AppUserDTO;
import com.gitlab.tomaszgryczka.fungiseeker.application.dtos.MushroomHuntingDTO;
import com.gitlab.tomaszgryczka.fungiseeker.domain.coordinates.Coordinates;
import com.gitlab.tomaszgryczka.fungiseeker.domain.mushroom.Mushroom;
import com.gitlab.tomaszgryczka.fungiseeker.infrastructure.hunting.MushroomHuntingRepository;
import com.gitlab.tomaszgryczka.fungiseeker.infrastructure.user.AppUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class MushroomHuntingService {

    private final MushroomHuntingRepository mushroomHuntingRepository;
    private final AppUserService appUserService;

    public Long createMushroomHunting(final String name, final String description) {
        validateUserHasNoActiveMushroomHunting();

        final var mushroomHunting = MushroomHunting.builder()
                .name(name)
                .description(description)
                .mushroomHuntingStatus(MushroomHuntingStatus.ACTIVE)
                .build();

        final var savedMushroomHunting = mushroomHuntingRepository.save(mushroomHunting);

        return savedMushroomHunting.getId();
    }

    public MushroomHuntingDTO getLastActiveMushroomHuntingDto() {
        final Long userId = appUserService.getUserId();
        final var mushroomHunting =
                mushroomHuntingRepository.findFirstByUserIdAndMushroomHuntingStatusOrderByStartDateDesc(
                        userId,
                        MushroomHuntingStatus.ACTIVE
                );

        return mushroomHunting.map(MushroomHuntingDTO::fromMushroomHunting).orElse(null);
    }

    public MushroomHunting getLastActiveMushroomHunting() {
        final Long userId = appUserService.getUserId();

        return mushroomHuntingRepository.findFirstByUserIdAndMushroomHuntingStatusOrderByStartDateDesc(
                        userId,
                        MushroomHuntingStatus.ACTIVE
                )
                .orElse(null);
    }

    public Long deactivateMushroomHunting(final MushroomHuntingVisibility visibility, final List<Long> sharedToUsers) {
        if (Objects.isNull(visibility)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Visibility cannot be null");
        } else if (Objects.nonNull(sharedToUsers) && !sharedToUsers.isEmpty()) {
            final var allUsersIds = appUserService.getAllUsers().stream()
                    .map(AppUserDTO::id)
                    .collect(Collectors.toSet());

            if (!allUsersIds.containsAll(sharedToUsers)) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Shared users list contains not existing users");
            }
        }

        final Long userId = appUserService.getUserId();
        final var mushroomHunting =
                mushroomHuntingRepository.findFirstByUserIdAndMushroomHuntingStatusOrderByStartDateDesc(
                        userId,
                        MushroomHuntingStatus.ACTIVE
                );

        mushroomHunting.ifPresent(mh -> {
                    mh.setCoordinates(calculateMushroomHuntingCoordinates(mh));
                    mh.setMushroomHuntingStatus(MushroomHuntingStatus.FINISHED);
                    mh.setEndDate(LocalDateTime.now());
                    mh.setVisibility(visibility);
                    mh.setSharedUsers(sharedToUsers);
                    mushroomHuntingRepository.save(mh);
                }
        );

        return mushroomHunting.map(MushroomHunting::getId).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User has no active mushroom hunting"));
    }

    // TODO VALIDATE IF USER HAS ACCESS TO THIS MUSHROOM HUNTING
    public MushroomHuntingDTO getMushroomHunting(final Long id) {
        final var mushroomHunting = mushroomHuntingRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Mushroom hunting not found"));

        return MushroomHuntingDTO.fromMushroomHunting(mushroomHunting);
    }

    public Collection<MushroomHuntingDTO> getLastTwoMushroomHunting() {
        final Long userId = appUserService.getUserId();
        return mushroomHuntingRepository.findTop2ByUserIdOrderByIdDesc(userId).stream()
                .map(MushroomHuntingDTO::fromMushroomHunting)
                .collect(Collectors.toList());
    }

    private void validateUserHasNoActiveMushroomHunting() {
        final Long userId = appUserService.getUserId();
        mushroomHuntingRepository.findByUserIdAndMushroomHuntingStatus(userId, MushroomHuntingStatus.ACTIVE)
                .ifPresent(mushroomHunting -> {
                    throw new ResponseStatusException(HttpStatus.FORBIDDEN, "User has already active mushroom hunting");
                });
    }

    private Coordinates calculateMushroomHuntingCoordinates(final MushroomHunting mushroomHunting) {
        final List<Mushroom> mushrooms = mushroomHunting.getMushrooms();

        final double latitude = mushrooms.stream()
                .filter(mushroom -> Objects.nonNull(mushroom.getCoordinates()))
                .mapToDouble(mushroom -> Double.parseDouble(mushroom.getCoordinates().getLatitude()))
                .average()
                .orElse(-1);

        final double longitude = mushrooms.stream()
                .filter(mushroom -> Objects.nonNull(mushroom.getCoordinates()))
                .mapToDouble(mushroom -> Double.parseDouble(mushroom.getCoordinates().getLongitude()))
                .average()
                .orElse(-1);

        if (latitude == -1 || longitude == -1) {
            return null;
        } else {
            return Coordinates.builder()
                    .latitude(Double.toString(latitude))
                    .longitude(Double.toString(longitude))
                    .build();
        }
    }
}
