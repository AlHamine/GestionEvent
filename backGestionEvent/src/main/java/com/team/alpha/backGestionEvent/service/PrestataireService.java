package com.team.alpha.backGestionEvent.service;

import com.team.alpha.backGestionEvent.model.Prestataire;
import com.team.alpha.backGestionEvent.repository.PrestataireRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PrestataireService {
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

    public Prestataire createPrestataire(Prestataire prestataire) {
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
            // Vous pouvez ajouter d'autres champs ici
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
