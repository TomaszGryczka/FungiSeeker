package com.gitlab.tomaszgryczka.fungiseeker.infrastructure.predictor;

import com.gitlab.tomaszgryczka.fungiseeker.application.dtos.PredictorDTO;
import com.gitlab.tomaszgryczka.fungiseeker.domain.hunting.MushroomHuntingService;
import com.gitlab.tomaszgryczka.fungiseeker.domain.mushroom.MushroomPrediction;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Profile;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Profile("!mocked")
@Service
public class MushroomPredictorRestConnector implements MushroomPredictorConnector {

    @Value("${predictor.url}")
    private String endpointUrl;

    @Value("${predictor.login}")
    private String login;

    @Value("${predictor.password}")
    private String password;

    private final MushroomHuntingService mushroomHuntingService;
    private final RestTemplate template;

    private static final String HEADERS_BODY = "headers";

    @Autowired
    public MushroomPredictorRestConnector(@Qualifier("predictorRestTemplate") RestTemplate restTemplate,
                                          MushroomHuntingService mushroomHuntingService) {
        this.mushroomHuntingService = mushroomHuntingService;
        this.template = restTemplate;
    }

    @Override
    public List<MushroomPrediction> getMushroomPredictionListFromImage(String blobStorageUrl) {
        final HttpHeaders headers = new HttpHeaders();
        headers.setBasicAuth(login, password);
        final HttpEntity<String> entity = new HttpEntity<>(HEADERS_BODY, headers);

        UriComponentsBuilder uriComponentsBuilder = UriComponentsBuilder.fromHttpUrl(endpointUrl)
                .queryParam("url", blobStorageUrl);

        return Collections.singletonList(
                Optional.ofNullable(template.exchange(uriComponentsBuilder.toUriString(), HttpMethod.GET, entity, PredictorDTO.class).getBody())
                        .map(PredictorDTO::toMushroomPredictionBuilder)
                        .map(builder -> {
                            builder.mushroomPredictionId(1L);
                            builder.imageUrl(blobStorageUrl);
                            builder.isEdible(true);
                            builder.mushroomHuntingId(mushroomHuntingService.getLastActiveMushroomHunting().getId());
                            return builder.build();
                        }).orElseThrow(() -> new RuntimeException("None mushroom prediction found")));
    }
}
