package com.gitlab.tomaszgryczka.fungiseeker.domain.chat;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "chat_session")
public class ChatSession {
    @Id
    private String sessionId;

    private Long mushroomHuntingId;
}
