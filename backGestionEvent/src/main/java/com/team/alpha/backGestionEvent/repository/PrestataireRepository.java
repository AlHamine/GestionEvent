package com.team.alpha.backGestionEvent.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import com.team.alpha.backGestionEvent.model.Demande;
import com.team.alpha.backGestionEvent.model.Prestataire;

/**
 * ClientRepository
 * EXCEPT (SELECT e.prestataire FROM Evenement e WHERE
 * e.prestataire.id=:idEvent)
 * 
 * (SELECT p FROM Prestataire p join
 * 
 * where p.id<>e.prestataire.id
 */
public interface PrestataireRepository extends CrudRepository<Prestataire, Long> {
    Optional<Prestataire> findByMail(String mail);

    // @Query("SELECT p FROM Evenement p ")
    // @Query("SELECT p FROM Prestataire p,evenement_prestataires ep where ep.evenement_id_event=:idEventSelected and prestataires_idp=p.idp")
    // @Query("SELECT e FROM Evenement_Prestataires e")
    // Iterable<Prestataire> findPrestataireNotYetDemande(@Param("idEventSelected") Long idp);

}