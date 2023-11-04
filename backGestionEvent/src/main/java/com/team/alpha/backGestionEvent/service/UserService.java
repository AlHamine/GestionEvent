package com.team.alpha.backGestionEvent.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.team.alpha.backGestionEvent.model.User;
import com.team.alpha.backGestionEvent.repository.UserRepository;

@Service
public class UserService {

    private final UserRepository userRepository; // Supposons que vous avez un UserRepository pour gérer les utilisateurs.

    // @Autowired
    private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder(); // Vous pouvez injecter un encodeur de mot de passe.

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

     @Transactional
    public User createUser(String mail, String password, String photo, String role) {
        // Vérifiez si un utilisateur avec la même adresse e-mail existe déjà
        // User existingUser = userRepository.findByMail(mail).get();

        if (userRepository.findByMail(mail).isPresent()) {
            // L'utilisateur avec cette adresse e-mail existe déjà, renvoyez une erreur.
            throw new RuntimeException("L'utilisateur avec cette adresse e-mail existe déjà.");
        }

        // Créez un nouvel utilisateur
        User user = new User();
        user.setMail(mail);
        user.setPassword(passwordEncoder.encode(password));
        user.setPhoto(photo);
        user.setRole(role);

        // Enregistrez le nouvel utilisateur en base de données
        return userRepository.save(user);
    }

}
