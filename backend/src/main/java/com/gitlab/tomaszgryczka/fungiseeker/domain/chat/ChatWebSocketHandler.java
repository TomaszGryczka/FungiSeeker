package com.gitlab.tomaszgryczka.fungiseeker.domain.chat;


import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.gitlab.tomaszgryczka.fungiseeker.application.dtos.ChatMessageDTO;
import com.gitlab.tomaszgryczka.fungiseeker.infrastructure.chat.ChatMessageRepository;
import com.gitlab.tomaszgryczka.fungiseeker.infrastructure.chat.ChatSessionRepository;
import com.gitlab.tomaszgryczka.fungiseeker.infrastructure.jpa.JpaAuditor;
import com.gitlab.tomaszgryczka.fungiseeker.infrastructure.user.AppUser;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.io.IOException;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

@Slf4j
@RequiredArgsConstructor
@Service
public class ChatWebSocketHandler extends TextWebSocketHandler {

    private static final ObjectMapper objectMapper;

    static {
        objectMapper = new ObjectMapper().registerModule(new JavaTimeModule());
    }

    private final ChatMessageService chatMessageService;
    private final ChatSessionRepository chatSessionRepository;
    private final ChatMessageRepository chatMessageRepository;
    private final Map<String, WebSocketSession> sessions = Collections.synchronizedMap(new HashMap<>());

    @Transactional
    @SneakyThrows
    @Override
    public void handleMessage(WebSocketSession session, WebSocketMessage<?> message) {
        JpaAuditor.disableAuditing();
        ChatMessageDTO receivedMessage = objectMapper.readValue((String) message.getPayload(), ChatMessageDTO.class);
        log.info("Received message: {}", objectMapper.writeValueAsString(receivedMessage));

        final AppUser user = chatMessageService.getUserIdFromSession(session);
        chatMessageService.validateUserHasAccessToMushroomHunting(receivedMessage.mushroomHuntingId(), String.valueOf(user.getId()));

        if (!chatSessionRepository.existsById(session.getId())) {
            log.info("New session: {}", session.getId());

            chatSessionRepository.save(ChatSession.builder()
                    .sessionId(session.getId())
                    .mushroomHuntingId(receivedMessage.mushroomHuntingId())
                    .build());

            sessions.put(session.getId(), session);
        } else {
            log.info("Existing session: {}", session.getId());
            var sessionsList = chatSessionRepository.findAllByMushroomHuntingId(receivedMessage.mushroomHuntingId());

            var savedMessage = chatMessageRepository.save(ChatMessage.builder()
                    .senderName(user.getName())
                    .mushroomHuntingId(receivedMessage.mushroomHuntingId())
                    .message(receivedMessage.message())
                    .build());

            sessionsList.forEach(se -> {
                try {
                    var sess = sessions.get(se.getSessionId());
                    if (Objects.nonNull(sess)) {
                        sess.sendMessage(
                                new TextMessage(objectMapper.writeValueAsString(
                                        receivedMessage.toBuilder()
                                                .senderName(user.getName())
                                                .createDate(savedMessage.getCreateDate().format(ChatMessageDTO.formatter))
                                                .build())
                                )
                        );
                    }


                } catch (IOException e) {
                    throw new RuntimeException(e);
                }
            });
        }
        JpaAuditor.enableAuditing();
    }

    @Override
    public void afterConnectionEstablished(WebSocketSession session) {
        log.info("New WebSocket connection established: {}", session.getId());
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) {
        log.info("WebSocket connection closed: " + session.getId() + "; CloseStatus: " + status);
        chatSessionRepository.deleteById(session.getId());
    }
}
