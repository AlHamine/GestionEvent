package com.team.alpha.backGestionEvent.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.team.alpha.backGestionEvent.model.Evenement;
import com.team.alpha.backGestionEvent.model.Prestataire;
import com.team.alpha.backGestionEvent.service.EventService;

@RestController
@RequestMapping("/event")

public class EventController {

    @Autowired
    private EventService eService;

    @GetMapping
    public Iterable<Evenement> getAllClients() {
        return eService.getAllClients();
    }

    @PostMapping
    public Evenement createClient(@RequestBody Evenement E) throws Exception {
        return eService.createEvent(E);
    }

    @PutMapping("/{evenementId}/prestataires")
    public ResponseEntity<Evenement> ajouterPrestataire(
            @PathVariable Long evenementId,
            @RequestBody Prestataire prestataire) {

        // Récupérer l'événement existant
        Evenement evenement = eService.getEvenementById(evenementId);

        if (evenement == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        // Ajouter le prestataire à l'événement
        evenement.ajouterPrestataire(prestataire);

        // Mettre à jour l'événement dans la base de données
        eService.updateEvenement(evenementId, evenement);

        return new ResponseEntity<>(evenement, HttpStatus.CREATED);
    }
}
