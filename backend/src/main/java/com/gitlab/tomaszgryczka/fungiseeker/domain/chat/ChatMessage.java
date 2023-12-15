package com.gitlab.tomaszgryczka.fungiseeker.domain.chat;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.context.event.EventListener;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EntityListeners(AuditingEntityListener.class)
@Builder
@Entity
@Table(name = "chat_message")
public class ChatMessage {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "chat_message_id_seq")
    @SequenceGenerator(name = "chat_message_id_seq", sequenceName = "chat_message_id_seq", allocationSize = 1)
    private Long id;

    private Long mushroomHuntingId;
    private String message;
    private String senderName;

    @CreatedDate
    private LocalDateTime createDate;
}
