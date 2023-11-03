package com.team.alpha.backGestionEvent.service;

import com.team.alpha.backGestionEvent.model.Client;


import com.team.alpha.backGestionEvent.model.Client;
import com.team.alpha.backGestionEvent.repository.ClientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ClientService {
    private final ClientRepository clientRepository;

    @Autowired
    public ClientService(ClientRepository clientRepository) {
        this.clientRepository = clientRepository;
    }

    public Iterable<Client> getAllClients() {
        return clientRepository.findAll();
    }

    public Optional<Client> getClientById(Long id) {
        return clientRepository.findById(id);
    }

    public Client createClient(Client client) {
        return clientRepository.save(client);
    }

    public Client updateClient(Long id, Client updatedClient) {
        Optional<Client> existingClient = clientRepository.findById(id);
        if (existingClient.isPresent()) {
            // Mettre à jour les champs nécessaires de l'objet Client existant
            Client client = existingClient.get();
            client.setNom(updatedClient.getNom());
            client.setPrenom(updatedClient.getPrenom());
            client.setMail(updatedClient.getMail());
            // Vous pouvez ajouter d'autres champs ici
            return clientRepository.save(client);
        } else {
            // Le client avec l'ID spécifié n'a pas été trouvé
            return null;
        }
    }

    public boolean deleteClient(Long id) {
        Optional<Client> client = clientRepository.findById(id);
        if (client.isPresent()) {
            clientRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
