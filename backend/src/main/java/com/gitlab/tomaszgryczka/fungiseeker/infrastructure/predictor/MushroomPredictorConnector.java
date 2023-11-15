package com.gitlab.tomaszgryczka.fungiseeker.infrastructure.predictor;

import com.gitlab.tomaszgryczka.fungiseeker.domain.mushroom.MushroomPrediction;
import org.springframework.stereotype.Service;

import java.util.List;

public interface MushroomPredictorConnector {
    List<MushroomPrediction> getMushroomPredictionListFromImage(final String blobStorageUrl);
}
