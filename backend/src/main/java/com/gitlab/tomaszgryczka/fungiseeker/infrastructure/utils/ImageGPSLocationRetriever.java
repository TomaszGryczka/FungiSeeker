package com.gitlab.tomaszgryczka.fungiseeker.infrastructure.utils;

import com.drew.imaging.ImageMetadataReader;
import com.drew.metadata.Metadata;
import com.drew.metadata.exif.GpsDirectory;
import com.gitlab.tomaszgryczka.fungiseeker.domain.coordinates.Coordinates;
import com.gitlab.tomaszgryczka.fungiseeker.infrastructure.blobStorage.ImageSavingException;
import lombok.experimental.UtilityClass;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.multipart.MultipartFile;

import java.util.Collection;

@Slf4j
@UtilityClass
public class ImageGPSLocationRetriever {
    public Coordinates getMultipartImageGPSLocation(final MultipartFile multipartFile) throws ImageSavingException {
        try {
            final Metadata metadata = ImageMetadataReader.readMetadata(multipartFile.getInputStream());
            Collection<GpsDirectory> gpsDirectories = metadata.getDirectoriesOfType(GpsDirectory.class);

            if (!gpsDirectories.isEmpty()) {
                final GpsDirectory gpsDirectory = gpsDirectories.iterator().next();
                final String longitude = String.valueOf(gpsDirectory.getGeoLocation().getLongitude());
                final String latitude = String.valueOf(gpsDirectory.getGeoLocation().getLatitude());

                return Coordinates.builder()
                        .longitude(longitude)
                        .latitude(latitude)
                        .build();
            } else {
                log.info("No GPS data found in image");
                return Coordinates.builder().build();
            }
        } catch (Exception ex) {
            throw new ImageSavingException("Error while processing image metadata");
        }
    }
}
