package com.team.alpha.backGestionEvent.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.team.alpha.backGestionEvent.model.Prestataire;
import com.team.alpha.backGestionEvent.model.Review;
import com.team.alpha.backGestionEvent.repository.PrestataireRepository;
import com.team.alpha.backGestionEvent.repository.ReviewRepository;

@RestController
@RequestMapping("/review")
public class ReviewController {

    @Autowired
    private ReviewRepository reviewRepository;

    @Autowired
    private PrestataireRepository prestataireRepository;

    @PostMapping
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

        reviewRepository.save(review);

        // Met à jour la note du produit
        prestataire.setRating(prestataire.getNote() + review.getNote());
        prestataireRepository.save(prestataire);

        return ResponseEntity.ok(review);
    }
}
