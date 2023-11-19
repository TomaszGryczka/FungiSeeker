package com.gitlab.tomaszgryczka.fungiseeker.infrastructure.auth0;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class Auth0UserRetriever {

    @Value("${oauth2.userinfo-endpoint-url}")
    private String endpointUrl;

    private static final String HEADERS_BODY = "headers";

    public Auth0User getUserInfoFromAuth0() {
        final HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(getTokenFromSession());
        final HttpEntity<String> entity = new HttpEntity<>(HEADERS_BODY, headers);

        final RestTemplate restTemplate = new RestTemplate();

        return restTemplate.exchange(endpointUrl, HttpMethod.POST, entity, Auth0User.class).getBody();
    }

    private String getTokenFromSession() {
        return ((JwtAuthenticationToken) SecurityContextHolder.getContext().getAuthentication()).getToken().getTokenValue();
    }
}
