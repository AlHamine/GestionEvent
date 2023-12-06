package com.team.alpha.backGestionEvent.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import com.team.alpha.backGestionEvent.model.Prestataire;

/**
 * ClientRepository
 * EXCEPT (SELECT e.prestataire FROM Evenement e WHERE
 * e.prestataire.id=:idEvent)
 * 
 * (SELECT p FROM Prestataire p
 * 
 * where p.id<>e.prestataire.id
 */
public interface PrestataireRepository extends CrudRepository<Prestataire, Long> {
    Optional<Prestataire> findByMail(String mail);

    @Query(value = "SELECT * FROM prestataire EXCEPT (SELECT p.* FROM prestataire p,evenement_prestataire where prestataire_id=p.idp and evenement_id= :evenementId) ", nativeQuery = true)
    List<Prestataire> findPrestatairesNotInEvenement(@Param("evenementId") Long idEvent);

    @Query(value = "SELECT p.* FROM prestataire p,evenement_prestataire where prestataire_id=p.idp and evenement_id= :evenementId", nativeQuery = true)
    List<Prestataire> findPrestatairesByEvenement(@Param("evenementId") Long idEvent);

}