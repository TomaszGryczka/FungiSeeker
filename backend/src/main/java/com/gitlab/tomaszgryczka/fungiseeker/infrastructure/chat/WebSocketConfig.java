package com.gitlab.tomaszgryczka.fungiseeker.infrastructure.chat;

import com.gitlab.tomaszgryczka.fungiseeker.domain.chat.ChatWebSocketHandler;
import jakarta.websocket.WebSocketContainer;
import org.apache.tomcat.websocket.WsWebSocketContainer;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.client.WebSocketConnectionManager;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;
import org.springframework.web.socket.server.standard.ServletServerContainerFactoryBean;

import java.util.List;

@Configuration
@EnableWebSocket
public class WebSocketConfig implements WebSocketConfigurer {

    @Value("${app.cors.allowed-origins}")
    private List<String> allowedOrigins;

    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        registry.addHandler(new ChatWebSocketHandler(), "/chat")
                .setAllowedOrigins("*");
    }
}
