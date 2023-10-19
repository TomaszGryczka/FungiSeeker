package com.gitlab.tomaszgryczka.fungiseeker.infrastructure;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "https://fungi-seeker-frontend.azurewebsites.net")
@RequestMapping("/api")
@RestController
public class MainMenuController {

    @GetMapping("/main-menu")
    public String mainMenu() {
        return "main menu";
    }
}
