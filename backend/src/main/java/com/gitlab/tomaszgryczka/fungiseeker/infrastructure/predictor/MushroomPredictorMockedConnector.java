package com.gitlab.tomaszgryczka.fungiseeker.infrastructure.predictor;

import com.gitlab.tomaszgryczka.fungiseeker.domain.hunting.MushroomHuntingService;
import com.gitlab.tomaszgryczka.fungiseeker.domain.mushroom.MushroomPrediction;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

@RequiredArgsConstructor
@Profile("mocked")
@Service
public class MushroomPredictorMockedConnector implements MushroomPredictorConnector {

    private final MushroomHuntingService mushroomHuntingService;

    @Override
    public List<MushroomPrediction> getMushroomPredictionListFromImage(String blobStorageUrl) {
        return Arrays.asList(
                MushroomPrediction.builder()
                        .mushroomHuntingId(mushroomHuntingService.getLastActiveMushroomHunting().id())
                        .name("Borowik szlachetny")
                        .probability(0.91)
                        .build(),
                MushroomPrediction.builder()
                        .mushroomHuntingId(mushroomHuntingService.getLastActiveMushroomHunting().id())
                        .name("Muchomorek czerwony")
                        .probability(0.05)
                        .build()
        );
    }
}
