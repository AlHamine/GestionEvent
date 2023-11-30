package com.team.alpha.backGestionEvent.service;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.team.alpha.backGestionEvent.model.Evenement;
import com.team.alpha.backGestionEvent.model.Prestataire;
import com.team.alpha.backGestionEvent.repository.EvenementRepository;

@Service
public class EventService {
    @Autowired
    EvenementRepository eRepository;

    @Autowired
    public EventService(EvenementRepository eRepository) {
        this.eRepository = eRepository;
    }

    public Iterable<Evenement> getAllClients() {
        return eRepository.findAll();
    }

    public Iterable<Evenement> getAllClientsByOrg(String id) {
        return eRepository.findByOrganisateur(id);
    }

    public Evenement createEvent(Evenement E) {
        return eRepository.save(E);
    }

    public void ajouterPrestataire(Evenement E, Prestataire prestataire) {
        E.ajouterPrestataire(prestataire);
        eRepository.save(E);
    }

    public void suprimmerPrestataire(Evenement E, Prestataire prestataire) {

        E.suprimerPrestataire(prestataire);
        eRepository.save(E);
    }

    public Evenement getEvenementById(Long id) {
        return eRepository.findById(id).get();
    }
    // public Client updateClient(Long id, Client updatedClient) {
    // Optional<Client> existingClient = clientRepository.findById(id);
    // if (existingClient.isPresent()) {
    // // Mettre à jour les champs nécessaires de l'objet Client existant
    // Client client = existingClient.get();
    // client.setNom(updatedClient.getNom());
    // client.setPrenom(updatedClient.getPrenom());
    // client.setPhoto(updatedClient.getPhoto());
    // client.setPassword(updatedClient.getPassword());
    // client.setMail(updatedClient.getMail());
    // Optional<User> updatedUser =
    // userRepository.findByMail(existingClient.get().getMail());
    // User user = userService.updateUser(id, client.getMail(),
    // client.getPassword(), client.getPhoto(), "client");
    // // Vous pouvez ajouter d'autres champs ici
    // return clientRepository.save(client);
    // } else {
    // // Le client avec l'ID spécifié n'a pas été trouvé
    // return null;
    // }
    // }

    // public Evenement updateEvenement(Long id, Evenement E) {
    // Optional<Evenement> existe = eRepository.findById(id);
    // if (existe.isPresent()) {
    // Evenement e = existe.get();
    // E.setDesciption(e.getDesciption());
    // E.setLieu(e.getLieu());
    // E.setOrganisateur(e.getOrganisateur());
    // E.setPrestataires(e.getPrestataires());
    // E.

    // }

    // }

    public Evenement updateEvenement(Long id, Evenement updatedEvenement) {
        Evenement existingEvenement = getEvenementById(id);

        if (existingEvenement == null) {
            // Gérer le cas où l'événement n'existe pas
            return null;
        }

        // Copier les propriétés mises à jour de updatedEvenement vers existingEvenement
        BeanUtils.copyProperties(updatedEvenement, existingEvenement, "idEvent");
        // Mettre à jour l'événement dans la base de données
        // (L'objet existingEvenement est déjà géré par JPA, les changements seront
        // automatiquement persistés)
        existingEvenement = eRepository.save(existingEvenement);

        return existingEvenement;
    }
}
