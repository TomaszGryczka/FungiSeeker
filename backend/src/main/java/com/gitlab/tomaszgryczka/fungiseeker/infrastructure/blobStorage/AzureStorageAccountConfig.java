package com.gitlab.tomaszgryczka.fungiseeker.infrastructure.blobStorage;

import com.azure.storage.blob.BlobServiceClient;
import com.azure.storage.blob.BlobServiceClientBuilder;
import com.azure.storage.common.StorageSharedKeyCredential;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@RequiredArgsConstructor
@Configuration
public class AzureStorageAccountConfig {

    @Value("${azure.storage.account.name}")
    private String accountName;

    @Value("${azure.storage.account.key}")
    private String accountKey;

    @Bean
    public BlobServiceClient storageClient() {
        return new BlobServiceClientBuilder()
                .endpoint(endpoint())
                .credential(credential())
                .buildClient();
    }

    private String endpoint() {
        return String.format("https://%s.blob.core.windows.net", accountName);
    }

    private StorageSharedKeyCredential credential() {
        return new StorageSharedKeyCredential(accountName, accountKey);
    }
}
