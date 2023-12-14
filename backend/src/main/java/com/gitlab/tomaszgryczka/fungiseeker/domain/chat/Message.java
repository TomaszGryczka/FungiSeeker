package com.gitlab.tomaszgryczka.fungiseeker.domain.chat;

import lombok.NonNull;

public record Message(@NonNull String content,
                      @NonNull String sender) {
}
