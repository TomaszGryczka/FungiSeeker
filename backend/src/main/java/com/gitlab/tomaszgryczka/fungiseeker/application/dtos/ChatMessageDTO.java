package com.gitlab.tomaszgryczka.fungiseeker.application.dtos;

import lombok.Builder;
import lombok.NonNull;
import org.springframework.cglib.core.Local;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Date;

@Builder(toBuilder = true)
public record ChatMessageDTO(@NonNull Long mushroomHuntingId,
                             String message,
                             String senderName,
                             String createDate) {

    public static DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
}
