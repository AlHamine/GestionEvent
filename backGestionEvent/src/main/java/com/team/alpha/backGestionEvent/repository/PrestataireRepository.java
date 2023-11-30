package com.team.alpha.backGestionEvent.repository;

<<<<<<< HEAD
<<<<<<< HEAD
=======
import java.util.Optional;

<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> 27aa8ab (Revision du projet dans le github)
=======
=======
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
>>>>>>> 1ca6e02 (clean code)
import org.springframework.data.jpa.repository.Query;
>>>>>>> 2494790 (Acception DE DEMANDE)
=======
import org.springframework.data.jpa.repository.Query;
>>>>>>> 2eca4da (Ra-ajustement du composant AddCustomer,ReviewForm et SecurityBackend)
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
<<<<<<< HEAD

=======
    Optional<Prestataire> findByMail(String mail);
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> 27aa8ab (Revision du projet dans le github)
=======
=======
>>>>>>> 2eca4da (Ra-ajustement du composant AddCustomer,ReviewForm et SecurityBackend)

    @Query(value = "SELECT * FROM prestataire EXCEPT (SELECT p.* FROM prestataire p,prestataire_evenement where prestataire_idp=p.idp and evenement_id_event = :evenementId) ", nativeQuery = true)
    List<Prestataire> findPrestatairesNotInEvenement(@Param("evenementId") Long idEvent);

@Query(value = "SELECT p.* FROM prestataire p,prestataire_evenement where prestataire_idp=p.idp and evenement_id_event = :evenementId", nativeQuery = true)
    List<Prestataire> findPrestatairesByEvenement(@Param("evenementId") Long idEvent);

<<<<<<< HEAD
>>>>>>> 2494790 (Acception DE DEMANDE)
=======
>>>>>>> 2eca4da (Ra-ajustement du composant AddCustomer,ReviewForm et SecurityBackend)
}