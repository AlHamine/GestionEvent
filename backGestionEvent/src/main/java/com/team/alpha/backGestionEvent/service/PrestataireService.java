package com.team.alpha.backGestionEvent.service;

import com.team.alpha.backGestionEvent.model.Demande;
import com.team.alpha.backGestionEvent.model.Evenement;
import com.team.alpha.backGestionEvent.model.FileData;
import com.team.alpha.backGestionEvent.model.Prestataire;
import com.team.alpha.backGestionEvent.model.User;
import com.team.alpha.backGestionEvent.repository.EvenementRepository;
import com.team.alpha.backGestionEvent.repository.FileDataRepository;
import com.team.alpha.backGestionEvent.repository.PrestataireRepository;
import com.team.alpha.backGestionEvent.repository.UserRepository;

import jakarta.transaction.Transactional;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class PrestataireService {

    private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @Autowired
    private UserService userService;
    @Autowired
    private FileDataRepository fileDataRepository;

    @Autowired
    private DemandeService dService;

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private EvenementRepository eRepository;
    private final PrestataireRepository prestataireRepository;

    public PrestataireService(PrestataireRepository prestataireRepository) {
        this.prestataireRepository = prestataireRepository;
    }

    public void accepterDemande(Demande demande, Evenement E, Prestataire p) {
        E.suprimerDemande(demande);
        p.suprimerDemande(demande);
        E.getOrganisateur().suprimerDemande(demande);
        eRepository.save(E);
        prestataireRepository.save(p);
        dService.deleteDemande(demande.getIdDemande());

    }

    // @GetMapping
    public Iterable<Prestataire> getAllPrestataires() {
        return prestataireRepository.findAll();
    }
    // List<Prestataire> liste=new ArrayList<Prestataire>();

    public ArrayList<Prestataire> prestataireByEvent(Evenement e) {
        ArrayList<Prestataire> l = new ArrayList<Prestataire>();
        prestataireRepository.findAll().forEach(p -> {
            if (!e.getPrestataires().contains(p)) {
                l.add(p);
            }
        });

        return l;
    }
    // public Iterable<Prestataire> findPrestataireNotYetDemande(Evenement e) {
    // return prestataireRepository.findPrestataireNotYetDemande(e.getIdEvent());
    // }

    public Optional<Prestataire> getPrestataireById(Long id) {
        return prestataireRepository.findById(id);
    }

    public Prestataire createPrestataire(Prestataire p) {
        p.setPassword(passwordEncoder.encode(p.getPassword()));
        return prestataireRepository.save(p);
    }

    @Transactional
    public Prestataire createPrestataire(String nom, String prenom, String service, String password, String mail,
            String photo) throws Exception {
        // Créez un nouvel utilisateur en utilisant le service UserService
        User user = userService.createUser(mail, password, photo, "prestataire");

        // Créez un prestataire et associez-le à l'utilisateur
        Prestataire prestataire = new Prestataire(nom, prenom, service, mail, photo, passwordEncoder.encode(password));
        // Enregistrez le prestataire en base de données
        return prestataireRepository.save(prestataire);
    }

    // Créez un nouveau prestataire en ajoutant la photo de profile
    public Prestataire createPrestataire(MultipartFile file, String nom, String prenom,
            String mail, String password, String service) {
        Prestataire prestataire = new Prestataire();
        prestataire.setNom(nom);
        prestataire.setPrenom(prenom);
        prestataire.setMail(mail);
        prestataire.setService(service);
        prestataire.setPassword(passwordEncoder.encode(password));
        prestataire.setPhoto(file.getOriginalFilename());
        return prestataireRepository.save(prestataire);
    }

    @Transactional
    public Prestataire updatePrestataire(Long id, Prestataire updatedPrestataire) {

        Prestataire existingPrestataire = prestataireRepository.findById(id).get();
        if (existingPrestataire == null) {
            // Gérer le cas où le Prestataire n'existe pas
            return null;
        }

        BeanUtils.copyProperties(updatedPrestataire, existingPrestataire, "idp");

        Optional<User> updatedUser = userRepository.findByMail(existingPrestataire.getMail());
        User user = userService.updateUser(id, existingPrestataire.getMail(), existingPrestataire.getPassword(),
                existingPrestataire.getPhoto(),
                "prestataire");
        return prestataireRepository.save(existingPrestataire);

        // Le prestataire avec l'ID spécifié n'a pas été trouvé

    }

    public Prestataire updatePrestataire(Long id, Evenement E) {
        Prestataire existingPrestataire = prestataireRepository.findById(id).get();
        if (existingPrestataire == null) {
            // Gérer le cas où le Prestataire n'existe pas
            return null;
        }
        // existingPrestataire.setEventActuel(E);
        existingPrestataire.ajoutEvenement(E);
        return prestataireRepository.save(existingPrestataire);

    }

    public boolean deletePrestataire(Long id) {
        Optional<Prestataire> prestataire = prestataireRepository.findById(id);
        if (prestataire.isPresent()) {
            Optional<User> deletedUser = userRepository.findByMail(prestataire.get().getMail());
            userService.deleteUser(deletedUser.get().getId());
            prestataireRepository.deleteById(id);
            return true;
        }
        return false;
    }

    public Optional<Prestataire> getPrestataireByMail(String mail) {
        return prestataireRepository.findByMail(mail);
    }

    // Recuperer l'image pour pouvoir l'exploiter
    public byte[] downloadImageFromFileSystem(String fileName) throws IOException {
        Optional<FileData> fileData = fileDataRepository.findByName(fileName);
        String filePath = fileData.get().getFilePath();
        byte[] images = Files.readAllBytes(new File(filePath).toPath());
        return images;
    }

    public List<Prestataire> findPrestatairesNotInEvenement(Evenement e) {
        return prestataireRepository.findPrestatairesNotInEvenement(e.getIdEvent());
    }
    public List<Prestataire> findPrestatairesByEvenement(Evenement e) {
        return prestataireRepository.findPrestatairesByEvenement(e.getIdEvent());
    }
}
/*
 * http POST :8080/api/prestataires nom="DIA" prenom="Mamadou"
 * mail="mamadoudia@gmail.com" service="Presentation" password="123456789"
 * Content-Type:application/json
 */