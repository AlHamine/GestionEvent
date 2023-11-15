package com.team.alpha.backGestionEvent.web;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
<<<<<<< HEAD
<<<<<<< HEAD
=======
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
>>>>>>> 3145185 (Revision de la structure du backend)
import org.springframework.web.bind.annotation.*;

import com.team.alpha.backGestionEvent.model.Client;
import com.team.alpha.backGestionEvent.model.Prestataire;
import com.team.alpha.backGestionEvent.model.User;
<<<<<<< HEAD
=======
import com.team.alpha.backGestionEvent.repository.PrestataireRepository;
// import com.team.alpha.backGestionEvent.repository.ReviwRepository;
import com.team.alpha.backGestionEvent.repository.UserRepository;
>>>>>>> 3145185 (Revision de la structure du backend)
=======
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import com.team.alpha.backGestionEvent.model.Client;
import com.team.alpha.backGestionEvent.model.Prestataire;
import com.team.alpha.backGestionEvent.model.Review;
import com.team.alpha.backGestionEvent.model.User;
import com.team.alpha.backGestionEvent.repository.PrestataireRepository;
import com.team.alpha.backGestionEvent.repository.ReviwRepository;
import com.team.alpha.backGestionEvent.repository.UserRepository;
>>>>>>> 27aa8ab (Revision du projet dans le github)
import com.team.alpha.backGestionEvent.service.PrestataireService;

//Pour les controller
@RestController
@RequestMapping("/prestataires")
public class PrestataireController {
<<<<<<< HEAD
    @Autowired
    private PrestataireService prestataireService;

<<<<<<< HEAD
=======
=======

    @Autowired
    private PrestataireService prestataireService;

>>>>>>> 27aa8ab (Revision du projet dans le github)
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PrestataireRepository prestataireRepository;

<<<<<<< HEAD
    // @Autowired
    // private ReviwRepository reviwRepository;

>>>>>>> 3145185 (Revision de la structure du backend)
=======
    @Autowired
    private ReviwRepository reviwRepository;

<<<<<<< HEAD
>>>>>>> 27aa8ab (Revision du projet dans le github)
    @GetMapping
    public Iterable<Prestataire> getAllClients() {
        return prestataireService.getAllPrestataires();
    }

    @GetMapping("/{id}")
    public Optional<Prestataire> getClientById(@PathVariable Long id) {
        return prestataireService.getPrestataireById(id);
    }

=======
>>>>>>> 310dff7 (Ajout du rapport)
    private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @PostMapping
    public Prestataire createPrestataire(@RequestBody Prestataire p) throws Exception {
        User user = new User(p.getMail(), passwordEncoder.encode(p.getPassword()), p.getPhoto(), "prestataire");
        userRepository.save(user);
        return prestataireService.createPrestataire(p);

    }

    @PutMapping("/{id}")
    public Prestataire updatePrestataire(@PathVariable Long id, @RequestBody Prestataire updatePrestataire) {
        return prestataireService.updatePrestataire(id, updatePrestataire);
    }

    @DeleteMapping("/{id}")
    public boolean deletePrestataire(@PathVariable Long id) {
        return prestataireService.deletePrestataire(id);
    }

    @GetMapping("/profile")
    public ResponseEntity<Prestataire> getPrestataireProfile(@AuthenticationPrincipal User user) {
        /*
         * Utilisez l'utilisateur actuellement connecté pour récupérer le profil du
<<<<<<< HEAD
         * client
=======
         * prestataire
>>>>>>> 27aa8ab (Revision du projet dans le github)
         */
        Optional<Prestataire> prestataire = prestataireService.getPrestataireById(user.getId());
        return new ResponseEntity<>(prestataire.get(), HttpStatus.OK);
    }
<<<<<<< HEAD
<<<<<<< HEAD
=======

>>>>>>> 4e71276 (Mettre a niveau mon repertoire avant le prochain pull)
=======

    // *******************************************************************************************************************
    @PostMapping("/reviews")
    public ResponseEntity<Review> createReview(@RequestBody Review review) {
        // Vérifie que l'utilisateur est connecté
        if (SecurityContextHolder.getContext().getAuthentication() == null) {
            return ResponseEntity.status(401).build();
        }

        // Vérifie que l'utilisateur a utilisé le service du prestataire
        Prestataire prestataire = prestataireRepository.findByMail(review.getEmailPrestataire()).orElse(null);

        if (prestataire == null) {
            return ResponseEntity.status(404).build();
        }

        // Vérifie que la note est comprise entre 1 et 5
        if (review.getNote() < 1 || review.getNote() > 5) {
            return ResponseEntity.status(400).build();
        }

        // Enregistre la critique
        review.setEmailClient(SecurityContextHolder.getContext().getAuthentication().getName());

        reviwRepository.save(review);

        // Met à jour la note du produit
        prestataire.setRating(prestataire.getNote() + review.getNote());
        prestataireRepository.save(prestataire);

        return ResponseEntity.ok(review);
    }

<<<<<<< HEAD
>>>>>>> 27aa8ab (Revision du projet dans le github)
=======
    // *******************************************************************************************************************
    @GetMapping("/mail")
    public Prestataire getClientByMail(@RequestParam String mail) {
        return prestataireService.getPrestataireByMail(mail).get();
    }
>>>>>>> 2fd3c3a (updating users->client et user->prestataires)
}
