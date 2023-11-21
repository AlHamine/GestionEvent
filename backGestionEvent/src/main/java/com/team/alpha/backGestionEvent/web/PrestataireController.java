package com.team.alpha.backGestionEvent.web;

import java.io.File;
import java.io.IOException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
<<<<<<< HEAD
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
=======
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.http.MediaType;

<<<<<<< HEAD
import com.team.alpha.backGestionEvent.model.Client;
=======
>>>>>>> d21b587 (Redefinir les entites pour gerer l'insertions des photos de profils.)
import com.team.alpha.backGestionEvent.model.Evenement;
import com.team.alpha.backGestionEvent.model.FileData;
import com.team.alpha.backGestionEvent.model.Prestataire;
import com.team.alpha.backGestionEvent.model.Review;
import com.team.alpha.backGestionEvent.model.User;
import com.team.alpha.backGestionEvent.repository.FileDataRepository;
import com.team.alpha.backGestionEvent.repository.PrestataireRepository;
import com.team.alpha.backGestionEvent.repository.ReviwRepository;
import com.team.alpha.backGestionEvent.repository.UserRepository;
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> 27aa8ab (Revision du projet dans le github)
=======
import com.team.alpha.backGestionEvent.service.EventService;
>>>>>>> 7e33b82 (Mise a jour majeur->ameliorer la coherence)
=======
import com.team.alpha.backGestionEvent.service.EventService;
>>>>>>> d21b587 (Redefinir les entites pour gerer l'insertions des photos de profils.)
import com.team.alpha.backGestionEvent.service.PrestataireService;

//Pour les controller
@RestController
@RequestMapping("/prestataires")
public class PrestataireController {
<<<<<<< HEAD
    @Autowired
    private PrestataireService prestataireService;

<<<<<<< HEAD
=======
=======

    @Autowired
    private PrestataireService prestataireService;

>>>>>>> 27aa8ab (Revision du projet dans le github)
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PrestataireRepository prestataireRepository;
    @Autowired
    private EventService eService;

<<<<<<< HEAD
    // @Autowired
    // private ReviwRepository reviwRepository;

>>>>>>> 3145185 (Revision de la structure du backend)
=======
    @Autowired
    private ReviwRepository reviwRepository;

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> 27aa8ab (Revision du projet dans le github)
    @GetMapping
    public Iterable<Prestataire> getAllClients() {
        return prestataireService.getAllPrestataires();
    }

    @GetMapping("/{id}")
    public Optional<Prestataire> getClientById(@PathVariable Long id) {
        return prestataireService.getPrestataireById(id);
    }

=======
>>>>>>> 310dff7 (Ajout du rapport)
=======
>>>>>>> d21b587 (Redefinir les entites pour gerer l'insertions des photos de profils.)
=======
    @Autowired
    private FileDataRepository fileDataRepository;

    private final String FOLDER_PATH = "/home/tinkin-djeeri/Téléchargements/Extraction/GestionEvent-back-end-al-hamine(3)/Modification/backGestionEvent/src/assets/";

>>>>>>> d84eb0e (Redefinir l'entite Prestataire pour gerer l'insertions des photos de profils.)
    private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @PostMapping
    public Prestataire createPrestataire(@RequestBody Prestataire p) throws Exception {
        User user = new User(p.getMail(), passwordEncoder.encode(p.getPassword()), p.getPhoto(), "prestataire");
        userRepository.save(user);
        return prestataireService.createPrestataire(p);

    }

    // Ajout avec la photo de profil
    @PostMapping("/prestatairephoto")
    @CrossOrigin(origins = "*", methods = { RequestMethod.POST,
            RequestMethod.GET, RequestMethod.OPTIONS })
    public Prestataire createprestataire(@RequestParam("file") MultipartFile file,
            @RequestParam("nom") String nom,
            @RequestParam("prenom") String prenom, @RequestParam("mail") String mail,
            @RequestParam("password") String password, String service) throws Exception {

        String filePath = FOLDER_PATH + file.getOriginalFilename();

        FileData fileData = fileDataRepository.save(FileData.builder()
                .name(file.getOriginalFilename())
                .type(file.getContentType())
                .filePath(filePath).build());

        file.transferTo(new File(filePath));
        User user = new User();
        user.setPhoto(file.getOriginalFilename());
        user.setMail(mail);
        user.setPassword(passwordEncoder.encode(password));
        user.setRole("prestataire");
        user.setPhoto(file.getOriginalFilename());
        userRepository.save(user);
        return prestataireService.createPrestataire(file, nom, prenom, mail, password, service);

    }

    // Recuperation de l'image par l'end-point pour son exploitation cote front-end
    @GetMapping("/{fileName}")
    public ResponseEntity<?> downloadImageFromFileSystem(@PathVariable String fileName) throws IOException {
        byte[] imageData = prestataireService.downloadImageFromFileSystem(fileName);
        return ResponseEntity.status(HttpStatus.OK)
                .contentType(MediaType.valueOf("image/png"))
                .body(imageData);

    }

    @PutMapping("/{id}")
    public Prestataire updatePrestataire(@PathVariable Long id, @RequestBody Prestataire updatePrestataire) {
        return prestataireService.updatePrestataire(id, updatePrestataire);

    }
<<<<<<< HEAD
=======

>>>>>>> d21b587 (Redefinir les entites pour gerer l'insertions des photos de profils.)
    @PutMapping("/event/{id}/{idE}")
    public ResponseEntity<Prestataire> updatePrestataireE(@PathVariable Long id, @PathVariable Long idE,
            @RequestBody Prestataire prestataire) {

        // Vérifiez si le prestataire existe
        Prestataire prestataireExistant = prestataireRepository.findById(id).orElseThrow();

        // Récupérez l'événement existant de la base de données
        Evenement evenement = eService.getEvenementById(idE);

        // Définissez l'événement sur la propriété evenement du prestataire
        // prestataireExistant.setEvenement(evenement);
        prestataireExistant.ajoutEvenement(evenement);
        evenement.ajouterPrestataire(prestataireExistant);
<<<<<<< HEAD
        
=======

>>>>>>> d21b587 (Redefinir les entites pour gerer l'insertions des photos de profils.)
        // Enregistrez le prestataire
        prestataireRepository.save(prestataireExistant);

        return ResponseEntity.ok(prestataireExistant);
<<<<<<< HEAD
=======
    }

<<<<<<< HEAD
    // Recuperation de l'image par l'end-point pour son exploitation cote front-end
    @GetMapping("/clientphoto/{fileName}")
    public ResponseEntity<?> downloadImageFromFileSystem(@PathVariable String fileName) throws IOException {
        byte[] imageData = prestataireService.downloadImageFromFileSystem(fileName);
        return ResponseEntity.status(HttpStatus.OK)
                .contentType(MediaType.valueOf("image/png"))
                .body(imageData);

>>>>>>> d21b587 (Redefinir les entites pour gerer l'insertions des photos de profils.)
    }

=======
>>>>>>> d84eb0e (Redefinir l'entite Prestataire pour gerer l'insertions des photos de profils.)
    @DeleteMapping("/{id}")
    public boolean deletePrestataire(@PathVariable Long id) {
        return prestataireService.deletePrestataire(id);
    }

    @GetMapping("/profile")
    public ResponseEntity<Prestataire> getPrestataireProfile(@AuthenticationPrincipal User user) {
        /*
         * Utilisez l'utilisateur actuellement connecté pour récupérer le profil du
<<<<<<< HEAD
         * client
=======
         * prestataire
>>>>>>> 27aa8ab (Revision du projet dans le github)
         */
        Optional<Prestataire> prestataire = prestataireService.getPrestataireById(user.getId());
        return new ResponseEntity<>(prestataire.get(), HttpStatus.OK);
    }
<<<<<<< HEAD
<<<<<<< HEAD
=======

>>>>>>> 4e71276 (Mettre a niveau mon repertoire avant le prochain pull)
=======

    // *******************************************************************************************************************
    @PostMapping("/reviews")
    public ResponseEntity<Review> createReview(@RequestBody Review review) {
        // Vérifie que l'utilisateur est connecté
        if (SecurityContextHolder.getContext().getAuthentication() == null) {
            return ResponseEntity.status(401).build();
        }

        // Vérifie que l'utilisateur a utilisé le service du prestataire
        Prestataire prestataire = prestataireRepository.findByMail(review.getEmailPrestataire()).orElse(null);

        if (prestataire == null) {
            return ResponseEntity.status(404).build();
        }

        // Vérifie que la note est comprise entre 1 et 5
        if (review.getNote() < 1 || review.getNote() > 5) {
            return ResponseEntity.status(400).build();
        }

        // Enregistre la critique
        review.setEmailClient(SecurityContextHolder.getContext().getAuthentication().getName());

        reviwRepository.save(review);

        // Met à jour la note du produit
        prestataire.setRating(prestataire.getNote() + review.getNote());
        prestataireRepository.save(prestataire);

        return ResponseEntity.ok(review);
    }

<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> 27aa8ab (Revision du projet dans le github)
=======
=======
>>>>>>> d21b587 (Redefinir les entites pour gerer l'insertions des photos de profils.)
    // *******************************************************************************************************************
    @GetMapping("/mail")
    public Prestataire getPrestataireByMail(@RequestParam String mail) {
        return prestataireService.getPrestataireByMail(mail).get();
    }
<<<<<<< HEAD
>>>>>>> 2fd3c3a (updating users->client et user->prestataires)
=======
>>>>>>> d21b587 (Redefinir les entites pour gerer l'insertions des photos de profils.)
}
