package com.gitlab.tomaszgryczka.fungiseeker.application.dtos;

import lombok.Builder;
import lombok.NonNull;

@Builder(toBuilder = true)
public record ChatMessageDTO(@NonNull Long mushroomHuntingId,
                             String message,
                             String senderName) {
}
