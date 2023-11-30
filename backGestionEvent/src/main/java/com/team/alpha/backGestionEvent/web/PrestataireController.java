package com.team.alpha.backGestionEvent.web;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
<<<<<<< HEAD
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
=======
>>>>>>> bbedf2c (Modification pour assurer l'ajout de l'avis du client apres le service de prestation)
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.http.MediaType;

<<<<<<< HEAD
<<<<<<< HEAD
import com.team.alpha.backGestionEvent.model.Client;
=======
>>>>>>> d21b587 (Redefinir les entites pour gerer l'insertions des photos de profils.)
=======
import com.team.alpha.backGestionEvent.model.Client;
import com.team.alpha.backGestionEvent.model.Demande;
>>>>>>> bbedf2c (Modification pour assurer l'ajout de l'avis du client apres le service de prestation)
import com.team.alpha.backGestionEvent.model.Evenement;
import com.team.alpha.backGestionEvent.model.FileData;
import com.team.alpha.backGestionEvent.model.Prestataire;
import com.team.alpha.backGestionEvent.model.Review;
import com.team.alpha.backGestionEvent.model.User;
import com.team.alpha.backGestionEvent.repository.ClientRepository;
import com.team.alpha.backGestionEvent.repository.DemandeRepository;
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
<<<<<<< HEAD
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
=======
>>>>>>> bbedf2c (Modification pour assurer l'ajout de l'avis du client apres le service de prestation)
    private FileDataRepository fileDataRepository;

    @Autowired
    private ClientRepository clientRepository;

    @Autowired
    private DemandeRepository demandeRepository;

    private final String FOLDER_PATH = System.getProperty("user.dir") + "/src/assets/";

<<<<<<< HEAD
>>>>>>> d84eb0e (Redefinir l'entite Prestataire pour gerer l'insertions des photos de profils.)
=======
    @Autowired
    private ReviwRepository reviwRepository;

>>>>>>> bbedf2c (Modification pour assurer l'ajout de l'avis du client apres le service de prestation)
    private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @PostMapping
    public Prestataire createPrestataire(@RequestBody Prestataire p) throws Exception {
        User user = new User(p.getMail(), passwordEncoder.encode(p.getPassword()), p.getPhoto(), "prestataire");
        userRepository.save(user);
        return prestataireService.createPrestataire(p);

    }

<<<<<<< HEAD
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

<<<<<<< HEAD
=======
    @GetMapping
    public Iterable<Prestataire> getAllPrestataires() {
        return prestataireRepository.findAll();
>>>>>>> d72ab0d (Mise a jour=>Gestion des Demandes de prestations)
=======
    @GetMapping
    public Iterable<Prestataire> getAllPrestataires() {
        return prestataireRepository.findAll();
>>>>>>> bbedf2c (Modification pour assurer l'ajout de l'avis du client apres le service de prestation)
    }

    @GetMapping("/notEvent/{idE}")
    public Iterable<Prestataire> findPrestataireNotYetDemande(@PathVariable Long idE) {
        Evenement evenement = eService.getEvenementById(idE);

        return prestataireService.prestataireByEvent(evenement);
    }

    @GetMapping("/notEvent/{idE}")
    public List<Prestataire> findPrestataireNotYetDemande(@PathVariable Long idE) {
        Evenement evenement = eService.getEvenementById(idE);

        return prestataireService.findPrestatairesNotInEvenement(evenement);
    }
    @GetMapping("/byEvent/{idE}")
    public List<Prestataire> findPrestataireByEvent(@PathVariable Long idE) {
        Evenement evenement = eService.getEvenementById(idE);

        return prestataireService.findPrestatairesByEvenement(evenement);
    }

    @PutMapping("/{id}")
    public Prestataire updatePrestataire(@PathVariable Long id, @RequestBody Prestataire updatePrestataire) {
        return prestataireService.updatePrestataire(id, updatePrestataire);

    }
<<<<<<< HEAD
<<<<<<< HEAD
=======

>>>>>>> d21b587 (Redefinir les entites pour gerer l'insertions des photos de profils.)
=======

>>>>>>> d72ab0d (Mise a jour=>Gestion des Demandes de prestations)
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
<<<<<<< HEAD
        
=======

>>>>>>> d21b587 (Redefinir les entites pour gerer l'insertions des photos de profils.)
=======

>>>>>>> d72ab0d (Mise a jour=>Gestion des Demandes de prestations)
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
    public boolean createReview(
            @RequestParam("emailPrestataire") String emailPrestataire,
            @RequestParam("emailClient") String emailClient,
            @RequestParam("comment") String comment,
            @RequestParam("note") int note) {

        Client client = clientRepository.findByMail(emailClient).orElse(null);
        Prestataire prestataire = prestataireRepository.findByMail(emailPrestataire).orElse(null);

        Demande demande = demandeRepository.findByClient(client).orElse(null);
        Demande demande_SeachPrestataire = demandeRepository.findByPrestataire(prestataire).orElse(null);

        if (prestataire != null || client != null) {
            int rating;

            rating = prestataire.getNote() + note;
            prestataire.setNote(rating);

            Review review = new Review();
            review.setNote(note);
            review.setEmailPrestataire(emailPrestataire);
            review.setEmailClient(emailClient);
            review.setComment(comment);

            // demande_SeachPrestataire.getStatus().compareToIgnoreCase("ACCEPTER") verefier
            // si le prestataire a accepte la demande puis noter
            if ((demande.getIdDemande() == demande_SeachPrestataire.getIdDemande())
                    && demande_SeachPrestataire.getStatus().compareToIgnoreCase("ACCEPTED") == 0) {
                reviwRepository.save(review);
                prestataireRepository.save(prestataire);
                return true;
            } else
                return false;
        }

        return false;

    }

<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> 27aa8ab (Revision du projet dans le github)
=======
=======
>>>>>>> d21b587 (Redefinir les entites pour gerer l'insertions des photos de profils.)
    // *******************************************************************************************************************
    @GetMapping("/mail")
    public Prestataire getClientByMail(@RequestParam String mail) {
        return prestataireService.getPrestataireByMail(mail).get();
    }
<<<<<<< HEAD
>>>>>>> 2fd3c3a (updating users->client et user->prestataires)
=======
>>>>>>> d21b587 (Redefinir les entites pour gerer l'insertions des photos de profils.)
}
