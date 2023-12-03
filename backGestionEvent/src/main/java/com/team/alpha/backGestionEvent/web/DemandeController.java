package com.team.alpha.backGestionEvent.web;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.team.alpha.backGestionEvent.model.Client;
import com.team.alpha.backGestionEvent.model.Demande;
import com.team.alpha.backGestionEvent.model.Evenement;
import com.team.alpha.backGestionEvent.model.Prestataire;
import com.team.alpha.backGestionEvent.repository.PrestataireRepository;
import com.team.alpha.backGestionEvent.service.ClientService;
import com.team.alpha.backGestionEvent.service.DemandeService;
import com.team.alpha.backGestionEvent.service.EventService;

@RestController
@RequestMapping("/demandes")
public class DemandeController {
    @Autowired
    DemandeService dService;

    @Autowired
    private PrestataireRepository prestataireRepository;
    @Autowired
    private EventService eService;

    @Autowired
    private ClientService cService;

    @GetMapping

    public Iterable<Demande> getAllDemande() {
        return dService.getAllDemande();
    }

    @GetMapping("contrat/{mail}")
    public List<Demande> contrat(@PathVariable String mail) {
        Prestataire prestataireExistant = prestataireRepository.findByMail(mail).orElseThrow();
        return dService.contrat(prestataireExistant);
    }

    @GetMapping("/{idE}/{idp}")
    public Demande getDemandeIdByPrestatireEvent(@PathVariable Long idp,
            @PathVariable Long idE) {
        // Vérifiez si le prestataire existe
        Prestataire prestataireExistant = prestataireRepository.findById(idp).orElseThrow();
        // Récupérez l'événement existant de la base de données
        Evenement evenement = eService.getEvenementById(idE);
        return dService.getDemandeByPrestataireEvenement(prestataireExistant, evenement);
    }

    @GetMapping("/{mail}")
    public Iterable<Demande> getDemandeIdByPrestatireEvent(@PathVariable String mail) {
        // Vérifiez si le prestataire existe
        Prestataire prestataireExistant = prestataireRepository.findByMail(mail).get();
        // Récupérez l'événement existant de la base de données
        return dService.getDemandeByPrestataire(prestataireExistant);
    }

    @PostMapping("/{idE}/{idp}")
    public Long ajoutDemande(@PathVariable Long idp,
            @PathVariable Long idE) {
        Demande D = new Demande();
        D.setStatus("EN_ATTENTE");
        // Vérifiez si le prestataire existe
        Prestataire prestataireExistant = prestataireRepository.findById(idp).orElseThrow();

        // Récupérez l'événement existant de la base de données
        Evenement evenement = eService.getEvenementById(idE);
        Client client = cService.getClientById(evenement.getOrganisateur().getIdc()).get();
        Demande d = dService.createDemande(D, evenement, prestataireExistant);
        client.ajoutDemande(d);
        // Définissez l'événement sur la propriété evenement du prestataire
        // prestataireExistant.setEvenement(evenement);
        prestataireExistant.ajoutDemande(d);
        // evenement.ajouterPrestataire(prestataireExistant);
        evenement.ajoutDemande(d);
        // Enregistrez le prestataire
        prestataireRepository.save(prestataireExistant);

        return d.getIdDemande();
    }

    @DeleteMapping("/{id}")
    public Boolean supprimerDemande(@PathVariable Long idp) {
        return dService.deleteDemande(idp);

    }

}
