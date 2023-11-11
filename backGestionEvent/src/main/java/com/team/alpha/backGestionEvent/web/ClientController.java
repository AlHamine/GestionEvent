package com.team.alpha.backGestionEvent.web;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import com.team.alpha.backGestionEvent.model.Client;
import com.team.alpha.backGestionEvent.model.User;
import com.team.alpha.backGestionEvent.repository.UserRepository;
import com.team.alpha.backGestionEvent.service.ClientService;

//Pour les controller 
@RestController
@RequestMapping("/client")
public class ClientController {
    @Autowired
    private ClientService clientService;

    @Autowired
    private UserRepository userRepository;

    @GetMapping
    public Iterable<Client> getAllClients() {
        return clientService.getAllClients();
    }

    @GetMapping("/{id}")
    public Optional<Client> getClientById(@PathVariable Long id) {
        return clientService.getClientById(id);
    }
// Nouveau Controller
    @GetMapping("/mail")
    public Client getClientByMail(@RequestParam String mail) {
        return clientService.getClientByMail(mail);
    }

    private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @PostMapping
    public Client createClient(@RequestBody Client c) throws Exception {
        User user = new User(c.getMail(), passwordEncoder.encode(c.getPassword()), c.getPhoto(), "client");
        userRepository.save(user);
        return clientService.createClient(c);
    }

    @PutMapping("/{id}")
    public Client updateClient(@PathVariable Long id, @RequestBody Client updatedClient) {
        return clientService.updateClient(id, updatedClient);
    }

    @DeleteMapping("/{id}")
    public boolean deleteClient(@PathVariable Long id) {
        return clientService.deleteClient(id);
    }

    @GetMapping("/profile")
    public ResponseEntity<Client> getClientProfile(@AuthenticationPrincipal User user) {
        // Utilisez l'utilisateur actuellement connecté pour récupérer le profil du
        // client
        Optional<Client> client = clientService.getClientById(user.getId());
        return new ResponseEntity<>(client.get(), HttpStatus.OK);
    }

    // Ajoutez d'autres méthodes pour les fonctionnalités spécifiques aux clients
}
