package com.gitlab.tomaszgryczka.fungiseeker.infrastructure.auth0;

public record Auth0User(String sub,
                        String given_name,
                        String family_name,
                        String nickname,
                        String name,
                        String picture,
                        String locale,
                        String updated_at,
                        String email,
                        boolean email_verified) {
}
