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
                        .mushroomPredictionId(1L)
                        .mushroomHuntingId(mushroomHuntingService.getLastActiveMushroomHuntingDto().id())
                        .name("Borowik szlachetny")
                        .probability(0.91)
                        .imageUrl("https://fungiseekerblobstorage.blob.core.windows.net/images/13bb7c99-fdb3-4a26-b270-eccd7ecf999dsignal-2023-11-15-232525_002.jpg")
                        .isEdible(true)
                        .build(),
                MushroomPrediction.builder()
                        .mushroomPredictionId(3L)
                        .mushroomHuntingId(mushroomHuntingService.getLastActiveMushroomHuntingDto().id())
                        .name("Muchomorek czerwony")
                        .probability(0.05)
                        .imageUrl("https://fungiseekerblobstorage.blob.core.windows.net/images/13bb7c99-fdb3-4a26-b270-eccd7ecf999dsignal-2023-11-15-232525_002.jpg")
                        .isEdible(false)
                        .build()
        );
    }
}
