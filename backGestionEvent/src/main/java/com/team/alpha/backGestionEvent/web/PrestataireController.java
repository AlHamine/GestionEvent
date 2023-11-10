package com.team.alpha.backGestionEvent.web;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
<<<<<<< HEAD
=======
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
>>>>>>> 3145185 (Revision de la structure du backend)
import org.springframework.web.bind.annotation.*;

import com.team.alpha.backGestionEvent.model.Client;
import com.team.alpha.backGestionEvent.model.Prestataire;
import com.team.alpha.backGestionEvent.model.User;
<<<<<<< HEAD
=======
import com.team.alpha.backGestionEvent.repository.PrestataireRepository;
// import com.team.alpha.backGestionEvent.repository.ReviwRepository;
import com.team.alpha.backGestionEvent.repository.UserRepository;
>>>>>>> 3145185 (Revision de la structure du backend)
import com.team.alpha.backGestionEvent.service.PrestataireService;

//Pour les controller
@RestController
@RequestMapping("/prestataires")
public class PrestataireController {
    @Autowired
    private PrestataireService prestataireService;

<<<<<<< HEAD
=======
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PrestataireRepository prestataireRepository;

    // @Autowired
    // private ReviwRepository reviwRepository;

>>>>>>> 3145185 (Revision de la structure du backend)
    @GetMapping
    public Iterable<Prestataire> getAllClients() {
        return prestataireService.getAllPrestataires();
    }

    @GetMapping("/{id}")
    public Optional<Prestataire> getClientById(@PathVariable Long id) {
        return prestataireService.getPrestataireById(id);
    }

    private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @PostMapping
    public Prestataire createPrestataire(@RequestBody Prestataire p) throws Exception {
        User user = new User(p.getMail(), passwordEncoder.encode(p.getPassword()), p.getPhoto(), "prestataire");
        userRepository.save(user);
        return prestataireService.createPrestataire(p);

    }

    @PutMapping("/{id}")
    public Prestataire updatePrestataire(@PathVariable Long id, @RequestBody Prestataire updatePrestataire) {
        return prestataireService.updatePrestataire(id, updatePrestataire);
    }

    @DeleteMapping("/{id}")
    public boolean deletePrestataire(@PathVariable Long id) {
        return prestataireService.deletePrestataire(id);
    }

    @GetMapping("/profile")
    public ResponseEntity<Prestataire> getPrestataireProfile(@AuthenticationPrincipal User user) {
        /*
         * Utilisez l'utilisateur actuellement connecté pour récupérer le profil du
         * client
         */
        Optional<Prestataire> prestataire = prestataireService.getPrestataireById(user.getId());
        return new ResponseEntity<>(prestataire.get(), HttpStatus.OK);
    }
<<<<<<< HEAD
=======

>>>>>>> 4e71276 (Mettre a niveau mon repertoire avant le prochain pull)
}
