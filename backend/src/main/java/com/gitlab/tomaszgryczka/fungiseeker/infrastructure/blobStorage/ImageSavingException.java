package com.gitlab.tomaszgryczka.fungiseeker.infrastructure.blobStorage;

public class ImageSavingException extends Exception {
    public ImageSavingException(String message) {
        super(message);
    }

    public ImageSavingException(String message, Throwable cause) {
        super(message, cause);
    }
}
