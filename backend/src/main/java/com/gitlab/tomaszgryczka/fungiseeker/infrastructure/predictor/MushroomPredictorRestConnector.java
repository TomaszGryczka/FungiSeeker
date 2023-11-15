package com.gitlab.tomaszgryczka.fungiseeker.infrastructure.predictor;

import com.gitlab.tomaszgryczka.fungiseeker.domain.mushroom.MushroomPrediction;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

@Profile("!mocked")
@Service
public class MushroomPredictorRestConnector implements MushroomPredictorConnector {

    @Override
    public List<MushroomPrediction> getMushroomPredictionListFromImage(String blobStorageUrl) {
        return Collections.emptyList();
    }
}
