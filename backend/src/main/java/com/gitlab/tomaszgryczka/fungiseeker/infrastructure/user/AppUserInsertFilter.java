package com.gitlab.tomaszgryczka.fungiseeker.infrastructure.user;

import jakarta.servlet.*;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.io.IOException;

@RequiredArgsConstructor
@Component
public class AppUserInsertFilter implements Filter {

    private final AppUserService appUserService;

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain)
            throws IOException, ServletException {

        appUserService.insertAppUserIfNeeded();
        filterChain.doFilter(servletRequest, servletResponse);
    }
}
