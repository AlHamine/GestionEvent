package com.team.alpha.backGestionEvent.web;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.team.alpha.backGestionEvent.model.Client;
import com.team.alpha.backGestionEvent.model.User;
import com.team.alpha.backGestionEvent.repository.ClientRepository;
import com.team.alpha.backGestionEvent.service.ClientService;

// @RestController
// public class ClientController {
//     @Autowired
//     private ClientRepository cRepository;

//     @RequestMapping("/client")
//     public Iterable<Client> getClients() {
//         return cRepository.findAll();
//     }
//Pour les controller 
@RestController
@RequestMapping("/client")
public class ClientController {

    @Autowired
    private ClientService clientService;

    @GetMapping("/profile")
    public ResponseEntity<Client> getClientProfile(@AuthenticationPrincipal User user) {
        // Utilisez l'utilisateur actuellement connecté pour récupérer le profil du
        // client
        Optional<Client> client = clientService.getClientById(user.getId());
        return new ResponseEntity<>(client.get(), HttpStatus.OK);
    }

    // Ajoutez d'autres méthodes pour les fonctionnalités spécifiques aux clients
}
