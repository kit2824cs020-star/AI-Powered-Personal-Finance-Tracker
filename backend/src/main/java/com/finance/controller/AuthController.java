package com.finance.controller;
import com.finance.model.User; import com.finance.repository.UserRepository; import com.finance.security.JwtService; import jakarta.validation.Valid; import jakarta.validation.constraints.*; import org.springframework.http.*; import org.springframework.security.crypto.password.PasswordEncoder; import org.springframework.web.bind.annotation.*; import java.util.Map;
@RestController @RequestMapping("/api/auth") public class AuthController {
 private final UserRepository users; private final PasswordEncoder encoder; private final JwtService jwt;
 public AuthController(UserRepository u,PasswordEncoder e,JwtService j){users=u;encoder=e;jwt=j;}
 public record RegisterRequest(@NotBlank String name,@Email @NotBlank String email,@NotBlank @Size(min=8) String password){} public record LoginRequest(@Email @NotBlank String email,@NotBlank String password){}
 @PostMapping("/register") public ResponseEntity<?> register(@Valid @RequestBody RegisterRequest r){String email=r.email().trim().toLowerCase();if(users.existsByEmail(email))return ResponseEntity.status(409).body(Map.of("message","Email already registered"));User u=new User();u.setName(r.name().trim());u.setEmail(email);u.setPasswordHash(encoder.encode(r.password()));users.save(u);return ResponseEntity.status(201).body(auth(u));}
 @PostMapping("/login") public ResponseEntity<?> login(@Valid @RequestBody LoginRequest r){User u=users.findByEmail(r.email().trim().toLowerCase()).orElse(null);if(u==null||!encoder.matches(r.password(),u.getPasswordHash()))return ResponseEntity.status(401).body(Map.of("message","Invalid email or password"));return ResponseEntity.ok(auth(u));}
 private Map<String,Object> auth(User u){return Map.of("token",jwt.generate(u.getId(),u.getEmail()),"user",Map.of("id",u.getId(),"name",u.getName(),"email",u.getEmail()));}
}
