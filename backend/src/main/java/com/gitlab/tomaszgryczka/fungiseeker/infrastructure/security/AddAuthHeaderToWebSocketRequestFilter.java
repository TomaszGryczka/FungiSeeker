package com.gitlab.tomaszgryczka.fungiseeker.infrastructure.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Arrays;
import java.util.Objects;

@Slf4j
@RequiredArgsConstructor
@Component
public class AddAuthHeaderToWebSocketRequestFilter extends OncePerRequestFilter {

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        final String authTokenCookie = request.getCookies() == null ? null : Arrays.stream(request.getCookies())
                .filter(cookie -> cookie.getName().equals("X-Authorization"))
                .findFirst()
                .map(Cookie::getValue)
                .orElse(null);

        if (Objects.nonNull(authTokenCookie)) {
            var mutableRequest = new MutableHttpServletRequest(request);
            mutableRequest.putHeader("Authorization", "Bearer " + authTokenCookie);

            filterChain.doFilter(mutableRequest, response);
        } else {
            filterChain.doFilter(request, response);
        }
    }
}
