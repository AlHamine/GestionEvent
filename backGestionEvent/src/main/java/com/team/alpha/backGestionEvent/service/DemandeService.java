package com.team.alpha.backGestionEvent.service;

import com.team.alpha.backGestionEvent.model.Demande;
import com.team.alpha.backGestionEvent.repository.DemandeRepository;
import com.team.alpha.backGestionEvent.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class DemandeService {

    @Autowired
    private DemandeRepository dRepository;
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserService userService;

    // Nouveau service provider
    @Autowired
    public DemandeService(DemandeRepository dRepository) {
        this.dRepository = dRepository;
    }

    public Iterable<Demande> getAllClients() {
        return dRepository.findAll();
    }

    public Optional<Demande> getClientById(Long id) {
        return dRepository.findById(id);
    }

    public Demande createDemande(Demande demande) {
        return dRepository.save(demande);

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
