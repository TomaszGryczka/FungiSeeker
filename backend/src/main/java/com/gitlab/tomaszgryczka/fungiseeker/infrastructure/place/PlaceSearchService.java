package com.gitlab.tomaszgryczka.fungiseeker.infrastructure.place;

import com.gitlab.tomaszgryczka.fungiseeker.application.dtos.PlaceSearchDTO;
import com.gitlab.tomaszgryczka.fungiseeker.domain.labels.MushroomLabels;
import com.gitlab.tomaszgryczka.fungiseeker.domain.coordinates.Coordinates;
import com.gitlab.tomaszgryczka.fungiseeker.domain.hunting.HuntingListService;
import com.gitlab.tomaszgryczka.fungiseeker.domain.hunting.MushroomHunting;
import com.gitlab.tomaszgryczka.fungiseeker.infrastructure.user.AppUserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.Map;
import java.util.Objects;
import java.util.stream.Collectors;

@Slf4j
@RequiredArgsConstructor
@Service
public class PlaceSearchService {

    private final HuntingListService huntingListService;
    private final AppUserService appUserService;

    public PlaceSearchDTO getBestPlaceForMushroomHunting(Integer distance, float longitude, float latitude) {

        final Coordinates userCoordinates = Coordinates.builder()
                .longitude(String.valueOf(longitude))
                .latitude(String.valueOf(latitude))
                .build();

        var mushroomHuntingList = huntingListService.getAllHuntingAvailableForUserWithId();

        var sortedByDistance = mushroomHuntingList.stream()
                .filter(mh -> Objects.nonNull(mh.getCoordinates()))
                .collect(Collectors.toMap(
                        mh -> calculateDistanceWithHaversine(userCoordinates, mh.getCoordinates()),
                        mh -> mh
                ));

        var placesInRange = sortedByDistance.entrySet().stream()
                .filter(mh -> mh.getKey() <= distance)
                .sorted(Comparator.comparingDouble(Map.Entry::getKey))
                .toList();

        // calculate best place by mushrooms best score
        var bestPlace = placesInRange.stream()
                .map(Map.Entry::getValue)
                .max(Comparator.comparingDouble(this::calculateMushroomHuntingScore))
                .orElse(null);

        if (Objects.nonNull(bestPlace)) {
            log.info("Best place found with id: {}, and name: {}", bestPlace.getId(), bestPlace.getName());

            return PlaceSearchDTO.builder()
                    .userName(appUserService.getUserNameById(bestPlace.getUserId()))
                    .mushrooms(createFoundMushroomStringList(bestPlace))
                    .googleMapLink(createBestPlaceGoogleMapLink(bestPlace))
                    .coordinates(Coordinates.builder()
                            .latitude(bestPlace.getCoordinates().getLatitude())
                            .longitude(bestPlace.getCoordinates().getLongitude())
                            .build())
                    .build();
        } else {
            throw new RuntimeException("No places found in range");
        }
    }

    public double calculateDistanceWithHaversine(final Coordinates from, final Coordinates to) {
        final double R = 6371;

        var lat1 = Math.toRadians(Double.parseDouble(from.getLatitude()));
        var lon1 = Math.toRadians(Double.parseDouble(from.getLongitude()));
        var lat2 = Math.toRadians(Double.parseDouble(to.getLatitude()));
        var lon2 = Math.toRadians(Double.parseDouble(to.getLongitude()));

        double latitudeDistance = lat2 - lat1;
        double longitudeDistance = lon2 - lon1;

        double a = Math.sin(latitudeDistance / 2) * Math.sin(latitudeDistance / 2) +
                Math.cos(lat1) * Math.cos(lat2) * Math.sin(longitudeDistance / 2) * Math.sin(longitudeDistance / 2);

        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        return R * c;
    }

    private double calculateMushroomHuntingScore(final MushroomHunting mushroomHunting) {
        var mushrooms = mushroomHunting.getMushrooms();

        if (mushrooms.isEmpty()) {
            return 0.0;
        } else {
            var mushroomsScore = mushrooms.stream()
                    .filter(m -> Objects.nonNull(m.getSpeciesId()))
                    .map(m -> MushroomLabels.mushrooms.get(m.getSpeciesId()).getScore())
                    .filter(Objects::nonNull)
                    .map(MushroomLabels.Score::getScore)
                    .reduce(0.0, Double::sum);

            return mushroomsScore / mushrooms.size();
        }
    }

    private String createFoundMushroomStringList(final MushroomHunting mushroomHunting) {
        var mushrooms = mushroomHunting.getMushrooms();

        if (mushrooms.isEmpty()) {
            return "";
        } else {
            final Map<String, Long> mushroomCountMap = mushrooms.stream()
                    .filter(m -> Objects.nonNull(m.getSpeciesId()))
                    .collect(Collectors.groupingBy(
                            m -> MushroomLabels.mushrooms.get(m.getSpeciesId()).getLabel(),
                            Collectors.counting()
                    ));

            return mushroomCountMap.entrySet().stream()
                    .map(entry -> entry.getValue() + " x " + entry.getKey())
                    .collect(Collectors.joining(", "));
        }
    }

    private String createBestPlaceGoogleMapLink(final MushroomHunting mushroomHunting) {
        return "https://maps.google.com/?q=" + mushroomHunting.getCoordinates().getLatitude() + "," + mushroomHunting.getCoordinates().getLongitude();
    }
}