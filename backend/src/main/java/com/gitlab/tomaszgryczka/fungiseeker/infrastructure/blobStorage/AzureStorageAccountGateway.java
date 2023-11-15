package com.gitlab.tomaszgryczka.fungiseeker.infrastructure.blobStorage;

import com.azure.storage.blob.BlobClient;
import com.azure.storage.blob.BlobContainerClient;
import com.azure.storage.blob.BlobServiceClient;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.InputStream;
import java.util.UUID;

@Slf4j
@RequiredArgsConstructor
@Service
public class AzureStorageAccountGateway {
    private static final String IMAGES_CONTAINER_NAME = "images";
    private final BlobServiceClient blobServiceClient;

    public String saveImageInBlobStorage(final MultipartFile multipartFile) throws ImageSavingException {
        try {
            final String filename = multipartFile.getOriginalFilename();
            final InputStream stream = multipartFile.getInputStream();

            log.info("Saving " + filename + " in blob storage...");
            final BlobContainerClient blobContainerClient = blobServiceClient.getBlobContainerClient(IMAGES_CONTAINER_NAME);
            final BlobClient blobClient = blobContainerClient.getBlobClient(UUID.randomUUID() + filename);

            blobClient.upload(stream);
            log.info(filename + " saved in blob storage");

            return blobClient.getBlobUrl();
        } catch (Exception ex) {
            throw new ImageSavingException("Error while saving image in blob storage");
        }
    }
}
