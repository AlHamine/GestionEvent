package com.team.alpha.backGestionEvent.service;

import com.team.alpha.backGestionEvent.model.Client;
import com.team.alpha.backGestionEvent.model.Demande;
import com.team.alpha.backGestionEvent.model.Evenement;
import com.team.alpha.backGestionEvent.model.Prestataire;
import com.team.alpha.backGestionEvent.repository.DemandeRepository;
import com.team.alpha.backGestionEvent.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DemandeService {

    @Autowired
    private DemandeRepository dRepository;
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserService userService;

    public Iterable<Demande> getAllDemande() {
        return dRepository.findAll();
    }

    // Nouveau service provider
    @Autowired
    // public DemandeService(DemandeRepository dRepository) {
    // this.dRepository = dRepository;
    // }

    // public void associer(Evenement E, Prestataire prestataire,Client C) {

    // dRepository.save(E);
    // }

    public DemandeService(DemandeRepository dRepository, UserRepository userRepository, UserService userService) {
        this.dRepository = dRepository;
        this.userRepository = userRepository;
        this.userService = userService;
    }

    public Optional<Demande> getClientById(Long id) {
        return dRepository.findById(id);
    }

    public Boolean existeDemande(Prestataire p, Evenement e) {
        return (dRepository.findByClientPrestataireEvent(p.getIdp(), e.getIdEvent()).isPresent());

    }

    // public Long getDemandeByPrestataireEvenement(Prestataire p, Evenement e) {
    // return dRepository.findByClientPrestataireEvent(p.getIdp(),
    // e.getIdEvent()).isPresent()
    // ? dRepository.findByClientPrestataireEvent(p.getIdp(),
    // e.getIdEvent()).get().getIdDemande()
    // : null;
    // }
    public Demande getDemandeByPrestataireEvenement(Prestataire p, Evenement e) {
        if (dRepository.findByClientPrestataireEvent(p.getIdp(), e.getIdEvent()).isPresent())
            return dRepository.findByClientPrestataireEvent(p.getIdp(), e.getIdEvent()).get();
        else
            return null;
    }

    public Iterable<Demande> getDemandeByPrestataire(Prestataire p) {
        return dRepository.findDemandeByPrestataire(p.getIdp());
    }

    public List<Demande> contrat(Prestataire p) {
        return dRepository.contrat(p.getIdp());
    }

    public Demande createDemande(Demande demande, Evenement E, Prestataire prestataire) {
        if (!existeDemande(prestataire, E)) {
            Client clientOrganisateur = E.getOrganisateur();
            demande.setClient(clientOrganisateur);
            demande.setPrestataire(prestataire);
            demande.setEvenement(E);
            return dRepository.save(demande);
        }
        return null;

    }

    public boolean deleteDemande(Long id) {
        Optional<Demande> client = dRepository.findById(id);
        if (client.isPresent()) {
            dRepository.deleteById(id);
            return true;
        }
        return false;
    }

    // @Transactional
    // public Client createDemande(String nom, String prenom, String mail, String
    // photo, String password) throws Exception {
    // // Créez un nouvel utilisateur en utilisant le service UserService
    // // User user = userService.createUser(mail, password, photo, "client");
    // User user = userService.createUser(mail, password, photo, "client");
    // // Créez un client et associez-le à l'utilisateur
    // Client client = new Client(nom, prenom, passwordEncoder.encode(password),
    // mail, photo);

    // // Assurez-vous que l'utilisateur est correctement associé au client si
    // // nécessaire.

    // // Enregistrez le client en base de données
    // return dRepository.save(client);
    // }
    // A Ameliorer

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

}
