package com.team.alpha.backGestionEvent.web;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import com.team.alpha.backGestionEvent.model.Prestataire;
import com.team.alpha.backGestionEvent.model.Review;
import com.team.alpha.backGestionEvent.model.User;
import com.team.alpha.backGestionEvent.repository.PrestataireRepository;
import com.team.alpha.backGestionEvent.repository.ReviwRepository;
import com.team.alpha.backGestionEvent.service.PrestataireService;

//Pour les controller
@RestController
@RequestMapping("/prestataires")
public class PrestataireController {

    @Autowired
    private PrestataireService prestataireService;

    @Autowired
    private PrestataireRepository prestataireRepository;

    @Autowired
    private ReviwRepository reviwRepository;

    @GetMapping
    public Iterable<Prestataire> getAllClients() {
        return prestataireService.getAllPrestataires();
    }

    @GetMapping("/{id}")
    public Optional<Prestataire> getClientById(@PathVariable Long id) {
        return prestataireService.getPrestataireById(id);
    }

    @PostMapping
    public Prestataire createPrestataire(@RequestParam String nom, @RequestParam String prenom,
            @RequestParam String mail,
            @RequestParam String photo, @RequestParam String password) throws Exception {
        return prestataireService.createPrestataire(nom, prenom, prenom, password,
                mail, photo);

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
         * prestataire
         */
        Optional<Prestataire> prestataire = prestataireService.getPrestataireById(user.getId());
        return new ResponseEntity<>(prestataire.get(), HttpStatus.OK);
    }

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
    // *******************************************************************************************************************

}
