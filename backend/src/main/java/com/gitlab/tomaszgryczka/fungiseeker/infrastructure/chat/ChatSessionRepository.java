package com.gitlab.tomaszgryczka.fungiseeker.infrastructure.chat;

import com.gitlab.tomaszgryczka.fungiseeker.domain.chat.ChatSession;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Collection;

public interface ChatSessionRepository extends JpaRepository<ChatSession, String> {
    Collection<ChatSession> findAllByMushroomHuntingId(Long mushroomHuntingId);
}
