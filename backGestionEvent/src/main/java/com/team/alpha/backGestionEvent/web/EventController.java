package com.team.alpha.backGestionEvent.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.team.alpha.backGestionEvent.model.Evenement;
import com.team.alpha.backGestionEvent.model.Prestataire;
import com.team.alpha.backGestionEvent.repository.PrestataireRepository;
import com.team.alpha.backGestionEvent.service.EventService;

@RestController
@RequestMapping("/event")

public class EventController {

    @Autowired
    private EventService eService;

    @Autowired
    private PrestataireRepository prestataireRepository;

    @GetMapping
    public Iterable<Evenement> getAllClients() {
        return eService.getAllClients();
    }

    @GetMapping("org/{id}")
    public Iterable<Evenement> getAllClientsByOrg(@PathVariable String id) {
        return eService.getAllClientsByOrg(id);
    }

    @PostMapping
    public Evenement createClient(@RequestBody Evenement E) throws Exception {
        return eService.createEvent(E);
    }

    @DeleteMapping("{idE}/prestataire/{id}")
    public boolean deletePrestataire(@PathVariable Long id, @PathVariable Long idE) {
        Evenement evenement = eService.getEvenementById(idE);
        Prestataire prestataireExistant = prestataireRepository.findById(id).orElseThrow();

        if (evenement == null) {
            return false;
        }
        eService.suprimmerPrestataire(evenement, prestataireExistant);
        return true;
    }
    // @PutMapping("/{evenementId}/prestataires")
    // public ResponseEntity<Evenement> ajouterPrestataire(
    // @PathVariable Long evenementId,
    // @RequestBody Prestataire prestataire) {

    // // Récupérer l'événement existant
    // Evenement evenement = eService.getEvenementById(evenementId);

    // if (evenement == null) {
    // return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    // }

    // // Ajouter le prestataire à l'événement
    // evenement.ajouterPrestataire(prestataire);
    // prestataire.setEvenement(evenement);
    // Prestataire p= prestataireService.updatePrestataire(prestataire.getIdp(),
    // prestataire);
    // // Mettre à jour l'événement dans la base de données
    // eService.updateEvenement(evenementId, evenement);

    // return new ResponseEntity<>(evenement, HttpStatus.CREATED);
    // }
}
