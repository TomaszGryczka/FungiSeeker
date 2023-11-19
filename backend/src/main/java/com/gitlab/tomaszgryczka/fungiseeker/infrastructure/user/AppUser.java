package com.gitlab.tomaszgryczka.fungiseeker.infrastructure.user;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "app_users")
public class AppUser {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "app_users_id_seq")
    @SequenceGenerator(name = "app_users_id_seq", sequenceName = "app_users_id_seq", allocationSize = 1)
    private Long id;

    @Column(name = "auth0_id")
    private String auth0Id;

    private String name;
    private String nickname;
}
