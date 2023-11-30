package com.team.alpha.backGestionEvent.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import com.team.alpha.backGestionEvent.model.Demande;
import com.team.alpha.backGestionEvent.model.Evenement;
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

    @Query(value = "SELECT * FROM prestataire EXCEPT (SELECT p.* FROM prestataire p,prestataire_evenement where prestataire_idp=p.idp and evenement_id_event = :evenementId) ", nativeQuery = true)
    List<Prestataire> findPrestatairesNotInEvenement(@Param("evenementId") Long idEvent);

@Query(value = "SELECT p.* FROM prestataire p,prestataire_evenement where prestataire_idp=p.idp and evenement_id_event = :evenementId", nativeQuery = true)
    List<Prestataire> findPrestatairesByEvenement(@Param("evenementId") Long idEvent);

}