package com.gitlab.tomaszgryczka.fungiseeker.domain.mushroom;

import com.gitlab.tomaszgryczka.fungiseeker.application.dtos.MushroomDTO;
import com.gitlab.tomaszgryczka.fungiseeker.application.dtos.MushroomPredictionDTO;
import com.gitlab.tomaszgryczka.fungiseeker.application.dtos.UpdateInfoDTO;
import com.gitlab.tomaszgryczka.fungiseeker.domain.hunting.MushroomHuntingService;
import com.gitlab.tomaszgryczka.fungiseeker.domain.hunting.MushroomHuntingVisibility;
import com.gitlab.tomaszgryczka.fungiseeker.infrastructure.blobStorage.AzureStorageAccountGateway;
import com.gitlab.tomaszgryczka.fungiseeker.infrastructure.blobStorage.ImageSavingException;
import com.gitlab.tomaszgryczka.fungiseeker.infrastructure.mushroom.MushroomRepository;
import com.gitlab.tomaszgryczka.fungiseeker.infrastructure.predictor.MushroomPredictorConnector;
import com.gitlab.tomaszgryczka.fungiseeker.infrastructure.user.AppUserService;
import com.gitlab.tomaszgryczka.fungiseeker.infrastructure.utils.ImageGPSLocationRetriever;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.Collection;
import java.util.Collections;
import java.util.Objects;
import java.util.stream.Collectors;

@Slf4j
@RequiredArgsConstructor
@Service
public class MushroomService {

    private final AzureStorageAccountGateway azureStorageAccountGateway;
    private final MushroomPredictorConnector mushroomPredictorConnector;
    private final MushroomRepository mushroomRepository;
    private final MushroomHuntingService mushroomHuntingService;
    private final AppUserService appUserService;

    public MushroomPredictionDTO addMushroomAndRetrieveMushroomSpeciesList(final MultipartFile file) {
        final var mushroomBuilder = Mushroom.builder();
        mushroomBuilder.userId(appUserService.getUserId());
        mushroomBuilder.mushroomHunting(mushroomHuntingService.getLastActiveMushroomHunting());

        try {
            final String imageUrl = azureStorageAccountGateway.saveImageInBlobStorage(file);
            mushroomBuilder.imageUrl(imageUrl);
            mushroomBuilder.coordinates(ImageGPSLocationRetriever.getMultipartImageGPSLocation(file));

            final Mushroom newMushroom = mushroomRepository.save(mushroomBuilder.build());
            return MushroomPredictionDTO.builder()
                    .mushroomId(newMushroom.getId())
                    .mushroomPredictions(mushroomPredictorConnector.getMushroomPredictionListFromImage(imageUrl))
                    .build();
        } catch (ImageSavingException ex) {
            log.error("Error while saving image in blob storage... Defaulting to none mushroom species found", ex);
        }

        final Mushroom newMushroom = mushroomRepository.save(mushroomBuilder.build());
        return MushroomPredictionDTO.builder()
                .mushroomId(newMushroom.getId())
                .mushroomPredictions(Collections.emptyList())
                .build();
    }

    public Mushroom updateMushroomInfo(final UpdateInfoDTO updateInfoDTO) {
        final String description = updateInfoDTO.description();
        final var prediction = updateInfoDTO.mushroomPrediction();

        final var mushroom = mushroomRepository.findById(prediction.mushroomId())
                .orElseThrow(() -> new RuntimeException("Mushroom with id " + prediction.mushroomId() + " not found"));

        final var selectedPrediction = prediction.mushroomPredictions().stream().findFirst();

        return mushroomRepository.save(
                mushroom.toBuilder()
                        .name(selectedPrediction.map(MushroomPrediction::name).orElse(null))
                        .speciesId(selectedPrediction.map(MushroomPrediction::mushroomPredictionId).orElse(null))
                        .description(description)
                        .isEdible(selectedPrediction.map(MushroomPrediction::isEdible).orElse(null))
                        .build()
        );
    }

    public Collection<MushroomDTO> getLastTwoMushrooms() {
        return mushroomRepository.findTop2ByUserIdOrderByIdDesc(appUserService.getUserId()).stream()
                .map(MushroomDTO::fromMushroom)
                .collect(Collectors.toList());
    }

    public void deleteMushroom(Long id) {
        validateUserHasAccessToMushroom(id);

        mushroomRepository.deleteById(id);
    }

    private void validateUserHasAccessToMushroom(Long mushroomId) {
        final var userId = appUserService.getUserId();

        final var mushroom = mushroomRepository.findById(mushroomId)
                .orElseThrow(() -> new RuntimeException("Mushroom with id " + mushroomId + " not found"));

        final var mushroomHunting = mushroom.getMushroomHunting();

        if (!Objects.equals(userId, mushroom.getUserId())) {
                throw new RuntimeException("User with id " + userId + " has no access to mushroom with id " + mushroomId);
        }
    }
}
