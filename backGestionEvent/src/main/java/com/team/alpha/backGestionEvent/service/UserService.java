package com.team.alpha.backGestionEvent.service;

import java.util.Optional;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.team.alpha.backGestionEvent.model.Client;
import com.team.alpha.backGestionEvent.model.User;
import com.team.alpha.backGestionEvent.repository.UserRepository;

@Service
public class UserService {

    private final UserRepository userRepository;

    // @Autowired
    private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder(); // injection d'un encodeur de mot de
                                                                                 // passe.

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

    public Optional<User> getClientByMail(String mail) {
        return userRepository.findByMail(mail);

    }

    @Transactional
    public User updateUser(Long userId, String newMail, String newPassword, String newPhoto, String newRole) {
        // Recherchez l'utilisateur existant par son ID
        Optional<User> existingUser = userRepository.findById(userId);

        if (existingUser.isPresent()) {
            User user = existingUser.get();

            // Mettez à jour les propriétés de l'utilisateur avec les nouvelles valeurs
            user.setMail(newMail);
            user.setPassword(passwordEncoder.encode(newPassword));
            user.setPhoto(newPhoto);
            user.setRole(newRole);

            // Enregistrez les modifications en base de données
            return userRepository.save(user);
        } else {
            // L'utilisateur avec l'ID spécifié n'a pas été trouvé
            throw new RuntimeException("L'utilisateur n'a pas été trouvé.");
        }
    }

    // Modification de l'utilisateur en y ajoutant la photo
    @Transactional
    public User updateUser(String newMail, String newPassword, String newPhoto, String newRole) {
        // Recherchez l'utilisateur existant par son ID
        Optional<User> existingUser = userRepository.findByMail(newMail);

        if (existingUser.isPresent()) {
            User user = existingUser.get();

            // Mettez à jour les propriétés de l'utilisateur avec les nouvelles valeurs
            // user.setMail(newMail);
            user.setPassword(passwordEncoder.encode(newPassword));
            user.setPhoto(newPhoto);
            user.setRole(newRole);

            // Enregistrez les modifications en base de données
            return userRepository.save(user);
        } else {
            // L'utilisateur avec l'ID spécifié n'a pas été trouvé
            throw new RuntimeException("L'utilisateur n'a pas été trouvé.");
        }
    }

    @Transactional
    public void deleteUser(Long userId) {
        // Recherchez l'utilisateur existant par son ID
        Optional<User> existingUser = userRepository.findById(userId);

        if (existingUser.isPresent()) {
            // Si l'utilisateur existe, supprimez-le de la base de données
            userRepository.delete(existingUser.get());
        } else {
            // L'utilisateur avec l'ID spécifié n'a pas été trouvé
            throw new RuntimeException("L'utilisateur n'a pas été trouvé.");
        }
    }

    public Iterable<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User findByUsername(String username) {
        return userRepository.findByMail(username).get();
    }
}