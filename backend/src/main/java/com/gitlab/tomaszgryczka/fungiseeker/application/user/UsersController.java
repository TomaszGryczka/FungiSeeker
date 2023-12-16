package com.gitlab.tomaszgryczka.fungiseeker.application.user;

import com.gitlab.tomaszgryczka.fungiseeker.application.dtos.AppUserDTO;
import com.gitlab.tomaszgryczka.fungiseeker.infrastructure.user.AppUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collection;

@RequiredArgsConstructor
@RequestMapping("/api/users")
@RestController
public class UsersController {

    private final AppUserService appUserService;

    @GetMapping
    public Collection<AppUserDTO> getUsers() {
        return appUserService.getAllUsers();
    }

    @GetMapping("/me")
    public AppUserDTO getMe() {
        return appUserService.getMe();
    }
}
