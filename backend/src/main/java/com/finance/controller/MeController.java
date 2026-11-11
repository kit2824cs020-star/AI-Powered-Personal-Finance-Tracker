package com.finance.controller;
import com.finance.repository.UserRepository; import org.springframework.security.core.Authentication; import org.springframework.web.bind.annotation.*; import java.util.Map;
@RestController @RequestMapping("/api") public class MeController {private final UserRepository users;public MeController(UserRepository u){users=u;}@GetMapping("/me") public Object me(Authentication a){var u=users.findById((String)a.getPrincipal()).orElseThrow();return Map.of("id",u.getId(),"name",u.getName(),"email",u.getEmail());}}
