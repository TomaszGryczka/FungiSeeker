package com.gitlab.tomaszgryczka.fungiseeker.infrastructure.chat;

import com.gitlab.tomaszgryczka.fungiseeker.domain.chat.ChatMessage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Collection;

public interface ChatMessageRepository extends JpaRepository<ChatMessage, Long> {
    Collection<ChatMessage> findAllByMushroomHuntingId(Long mushroomHuntingId);
}
