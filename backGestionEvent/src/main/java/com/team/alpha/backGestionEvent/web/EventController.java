package com.team.alpha.backGestionEvent.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.team.alpha.backGestionEvent.model.Evenement;
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

//     @GetMapping("/{id}")
//     public Optional<Client> getClientById(@PathVariable Long id) {
//         return clientService.getClientById(id);
//     }
// // Nouveau Controller
//     @GetMapping("/mail/{mail}")
//     public Client getClientByMail(@PathVariable String mail) {
//         return clientService.getClientByMail(mail);
//     }

    @PostMapping
    public Evenement createClient(@RequestBody Evenement E) throws Exception {
        return eService.createEvent(E);
    }

    // @PutMapping("/{id}")
    // public Client updateClient(@PathVariable Long id, @RequestBody Client updatedClient) {
    //     return clientService.updateClient(id, updatedClient);
    // }

    // @DeleteMapping("/{id}")
    // public boolean deleteClient(@PathVariable Long id) {
    //     return clientService.deleteClient(id);
    // }

    // @GetMapping("/profile")
    // public ResponseEntity<Client> getClientProfile(@AuthenticationPrincipal User user) {
    //     // Utilisez l'utilisateur actuellement connecté pour récupérer le profil du
    //     // client
    //     Optional<Client> client = clientService.getClientById(user.getId());
    //     return new ResponseEntity<>(client.get(), HttpStatus.OK);
    // }

    // Ajoutez d'autres méthodes pour les fonctionnalités spécifiques aux clients
}
