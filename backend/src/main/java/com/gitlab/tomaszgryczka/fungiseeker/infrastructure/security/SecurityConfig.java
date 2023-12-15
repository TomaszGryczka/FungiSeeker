package com.gitlab.tomaszgryczka.fungiseeker.infrastructure.security;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.oauth2.client.web.OAuth2LoginAuthenticationFilter;
import org.springframework.security.oauth2.core.DelegatingOAuth2TokenValidator;
import org.springframework.security.oauth2.core.OAuth2TokenValidator;
import org.springframework.security.oauth2.jwt.*;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.access.intercept.AuthorizationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Slf4j
@Configuration
@EnableWebSecurity(debug = true)
public class SecurityConfig {

    @Value("${app.cors.allowed-origins}")
    private List<String> allowedOrigins;

    @Value("${okta.oauth2.audience}")
    private String audience;

    @Value("${okta.oauth2.issuer}")
    private String issuer;

    @Value("${spring.security.enabled}")
    private boolean securityEnabled;

    @Bean
    public SecurityFilterChain filterChain(final HttpSecurity http) throws Exception {
        log.info(securityEnabled ? "Security enabled" : "Security disabled");
        if (securityEnabled) {
            http.addFilterBefore(new AddAuthHeaderToWebSocketRequestFilter(), OAuth2LoginAuthenticationFilter.class);
            http.authorizeHttpRequests(authorize -> authorize.requestMatchers("/**").authenticated());
            http.cors(Customizer.withDefaults());
            http.oauth2ResourceServer(oauth2 -> oauth2.jwt(jwt -> jwt.decoder(jwtDecoder())));
        } else {
            http.authorizeHttpRequests(authorize -> authorize.requestMatchers("/**").permitAll());
            http.cors(Customizer.withDefaults());
        }
        http.csrf(AbstractHttpConfigurer::disable);
        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowedOrigins(allowedOrigins);
        config.addAllowedMethod("*");
        config.addAllowedHeader("*");

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
    }

    private JwtDecoder jwtDecoder() {
        final OAuth2TokenValidator<Jwt> audienceValidator = new AudienceValidator(audience);
        final OAuth2TokenValidator<Jwt> withIssuer = JwtValidators.createDefaultWithIssuer(issuer);
        final OAuth2TokenValidator<Jwt> withAudience = new DelegatingOAuth2TokenValidator<>(withIssuer, audienceValidator);

        final NimbusJwtDecoder jwtDecoder = JwtDecoders.fromOidcIssuerLocation(issuer);
        jwtDecoder.setJwtValidator(withAudience);

        return jwtDecoder;
    }
}
