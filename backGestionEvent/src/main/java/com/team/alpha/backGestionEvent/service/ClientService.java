package com.team.alpha.backGestionEvent.service;

import com.team.alpha.backGestionEvent.model.Client;
import com.team.alpha.backGestionEvent.model.FileData;
import com.team.alpha.backGestionEvent.model.User;
import com.team.alpha.backGestionEvent.repository.ClientRepository;
import com.team.alpha.backGestionEvent.repository.FileDataRepository;
import com.team.alpha.backGestionEvent.repository.UserRepository;

import jakarta.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.util.Optional;

@Service
public class ClientService {

    private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @Autowired
    private ClientRepository clientRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private FileDataRepository fileDataRepository;
    @Autowired
    private UserService userService;
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD

=======
// Nouveau service provider
=======

    // Nouveau service provider
>>>>>>> d21b587 (Redefinir les entites pour gerer l'insertions des photos de profils.)
    @Autowired
>>>>>>> cfe2644 (Update Logout et Login maintien des user , create event)
=======
// Nouveau service provider
    @Autowired
>>>>>>> 8e0880c (Backend updated)
=======
// Nouveau service provider
    @Autowired
>>>>>>> 27aa8ab (Revision du projet dans le github)
    public ClientService(ClientRepository clientRepository) {
        this.clientRepository = clientRepository;
    }

<<<<<<< HEAD
    public Optional<Client> getClientByMail(String mail) {
       return clientRepository.findByMail(mail);
=======
    public Iterable<Client> getAllClients() {
        return clientRepository.findAll();
    }

    public Optional<Client> getClientByMail(String mail) {
        return clientRepository.findByMail(mail);
>>>>>>> d21b587 (Redefinir les entites pour gerer l'insertions des photos de profils.)

    }

    public Optional<Client> getClientById(Long id) {
        return clientRepository.findById(id);
    }

    public Client createClient(Client client) {
        client.setPassword(passwordEncoder.encode(client.getPassword()));
        return clientRepository.save(client);

    }
<<<<<<< HEAD
// Deuxieme Methode
=======

    // Deuxieme Methode
>>>>>>> d21b587 (Redefinir les entites pour gerer l'insertions des photos de profils.)
    @Transactional
    public Client createClient(String nom, String prenom, String mail, String photo, String password) throws Exception {
        // Créez un nouvel utilisateur en utilisant le service UserService
        // User user = userService.createUser(mail, password, photo, "client");
        User user = userService.createUser(mail, password, photo, "client");
        // Créez un client et associez-le à l'utilisateur
        Client client = new Client(nom, prenom, passwordEncoder.encode(password), mail, photo);

        // Assurez-vous que l'utilisateur est correctement associé au client si
        // nécessaire.

        // Enregistrez le client en base de données
        return clientRepository.save(client);
    }

    public Client createClient(MultipartFile file, String nom, String prenom,
            String mail, String password) {
        Client client = new Client();
        client.setNom(nom);
        client.setPrenom(prenom);
        client.setMail(mail);
        client.setPassword(passwordEncoder.encode(password));
        client.setPhoto(file.getOriginalFilename());

        return clientRepository.save(client);
    }
    // A Ameliorer

    public Client updateClient(Long id, Client updatedClient) {
        Optional<Client> existingClient = clientRepository.findById(id);
        if (existingClient.isPresent()) {
            // Mettre à jour les champs nécessaires de l'objet Client existant
            Client client = existingClient.get();
            client.setNom(updatedClient.getNom());
            client.setPrenom(updatedClient.getPrenom());
            client.setPhoto(updatedClient.getPhoto());
            client.setPassword(updatedClient.getPassword());
            client.setMail(updatedClient.getMail());
            Optional<User> updatedUser = userRepository.findByMail(existingClient.get().getMail());
            User user = userService.updateUser(id, client.getMail(), client.getPassword(), client.getPhoto(), "client");
            // Vous pouvez ajouter d'autres champs ici
            return clientRepository.save(client);
        } else {
            // Le client avec l'ID spécifié n'a pas été trouvé
            return null;
        }
    }

    //
    public byte[] downloadImageFromFileSystem(String fileName) throws IOException, java.io.IOException {
        Optional<FileData> fileData = fileDataRepository.findByName(fileName);
        String filePath = fileData.get().getFilePath();
        byte[] images = Files.readAllBytes(new File(filePath).toPath());
        return images;
    }

    public boolean deleteClient(Long id) {
        Optional<Client> client = clientRepository.findById(id);
        if (client.isPresent()) {
            Optional<User> deletedUser = userRepository.findByMail(client.get().getMail());
            userService.deleteUser(deletedUser.get().getId());
            clientRepository.deleteById(id);
            return true;
        }
        return false;
    }

}
