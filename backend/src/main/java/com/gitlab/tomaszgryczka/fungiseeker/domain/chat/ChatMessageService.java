package com.gitlab.tomaszgryczka.fungiseeker.domain.chat;

import com.gitlab.tomaszgryczka.fungiseeker.application.dtos.StrippedMushroomHuntingDTO;
import com.gitlab.tomaszgryczka.fungiseeker.domain.hunting.HuntingListService;
import com.gitlab.tomaszgryczka.fungiseeker.infrastructure.chat.ChatMessageRepository;
import com.gitlab.tomaszgryczka.fungiseeker.infrastructure.user.AppUser;
import com.gitlab.tomaszgryczka.fungiseeker.infrastructure.user.AppUserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.socket.WebSocketSession;

import java.security.Principal;
import java.util.Collection;
import java.util.Optional;

@Slf4j
@RequiredArgsConstructor
@Service
public class ChatMessageService {

    private final ChatMessageRepository chatMessageRepository;
    private final HuntingListService huntingListService;
    private final AppUserService appUserService;

    @Value("${spring.security.enabled}")
    private boolean securityEnabled;

    public void validateUserHasAccessToMushroomHunting(Long mushroomHuntingId, String userId) {

        huntingListService.getAllHuntingAvailableForUser(Long.valueOf(userId)).stream()
                .map(StrippedMushroomHuntingDTO::id)
                .filter(id -> id.equals(mushroomHuntingId))
                .findAny()
                .orElseThrow(() ->
                        new IllegalArgumentException("User with id: " + userId + " does not have access to mushroom hunting with id: " + mushroomHuntingId));
    }

    public AppUser getUserIdFromSession(WebSocketSession session) {
        if (securityEnabled) {
            return Optional.ofNullable(session.getPrincipal())
                    .map(Principal::getName)
                    .map(appUserService::getAppUserByAuth0Id)
                    .orElseThrow(() -> new IllegalArgumentException("User not logged in!"));
        } else {
            return AppUser.builder()
                    .id(1L)
                    .name("Gość")
                    .build();
        }
    }

    // todo secure it
    public Collection<ChatMessage> getAllChatMessagesForMushroomHunting(Long mushroomHuntingId) {
        return chatMessageRepository.findAllByMushroomHuntingId(mushroomHuntingId);
    }
}
