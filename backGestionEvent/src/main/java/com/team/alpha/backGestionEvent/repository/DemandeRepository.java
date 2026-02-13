package com.team.alpha.backGestionEvent.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import com.team.alpha.backGestionEvent.model.Client;
import com.team.alpha.backGestionEvent.model.Demande;
import com.team.alpha.backGestionEvent.model.Evenement;
import com.team.alpha.backGestionEvent.model.Prestataire;

/**
 * ClientRepository
 */
@RepositoryRestResource
public interface DemandeRepository extends CrudRepository<Demande, Long> {
    // List<Evenement> findByLieu(@Param("lieu") String lieu);
    Optional<Demande> findByClient(Client idc);

    Optional<Demande> findByPrestataire(Prestataire id);

    Optional<Demande> findByEvenement(Evenement id);

    @Query("SELECT e FROM Demande e WHERE  e.evenement.id =:idEvent and e.prestataire.id=:idp")

    Optional<Demande> findByClientPrestataireEvent(@Param("idp") Long idp,
            @Param("idEvent") Long idEvent);

    @Query("SELECT e FROM Demande e WHERE e.prestataire.id=:idp")

    Iterable<Demande> findDemandeByPrestataire(@Param("idp") Long idp);

    @Query(value = "SELECT d.* FROM demande d WHERE status='ACCEPTED' AND prestataire_id= :idPres ", nativeQuery = true)
    List<Demande> contrat(@Param("idPres") Long idPres);

    @Query(value = "SELECT d.* FROM demande d WHERE status='ACCEPTED' AND prestataire_id= :idPres AND client_id= :idClent LIMIT 1", nativeQuery = true)
    Demande estLierDemande(@Param("idPres") Long idPres, @Param("idClent") Long idclient);

}