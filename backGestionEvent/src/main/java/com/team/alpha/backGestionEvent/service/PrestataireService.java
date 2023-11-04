package com.team.alpha.backGestionEvent.service;

import com.team.alpha.backGestionEvent.model.Prestataire;
import com.team.alpha.backGestionEvent.model.User;
import com.team.alpha.backGestionEvent.repository.PrestataireRepository;

import jakarta.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PrestataireService {
    @Autowired
    private UserService userService;
    private final PrestataireRepository prestataireRepository;

    @Autowired
    public PrestataireService(PrestataireRepository prestataireRepository) {
        this.prestataireRepository = prestataireRepository;
    }

    public Iterable<Prestataire> getAllPrestataires() {
        return prestataireRepository.findAll();
    }

    public Optional<Prestataire> getPrestataireById(Long id) {
        return prestataireRepository.findById(id);
    }

    @Transactional
    public Prestataire createPrestataire(String nom, String prenom, String service, String password, String mail,
            String photo) throws Exception {
        // Créez un nouvel utilisateur en utilisant le service UserService
        User user = userService.createUser(mail, password, photo, "prestataire");

        // Créez un prestataire et associez-le à l'utilisateur
        Prestataire prestataire = new Prestataire(nom, prenom, service, password, mail, photo);
        // Enregistrez le prestataire en base de données
        return prestataireRepository.save(prestataire);
    }

    public Prestataire updatePrestataire(Long id, Prestataire updatedPrestataire) {
        Optional<Prestataire> existingPrestataire = prestataireRepository.findById(id);
        if (existingPrestataire.isPresent()) {
            // Mettre à jour les champs nécessaires de l'objet Prestataire existant
            Prestataire prestataire = existingPrestataire.get();
            prestataire.setNom(updatedPrestataire.getNom());
            prestataire.setPrenom(updatedPrestataire.getPrenom());
            prestataire.setService(updatedPrestataire.getService());
            
            return prestataireRepository.save(prestataire);
        } else {
            // Le prestataire avec l'ID spécifié n'a pas été trouvé
            return null;
        }
    }

    public boolean deletePrestataire(Long id) {
        Optional<Prestataire> prestataire = prestataireRepository.findById(id);
        if (prestataire.isPresent()) {
            prestataireRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
