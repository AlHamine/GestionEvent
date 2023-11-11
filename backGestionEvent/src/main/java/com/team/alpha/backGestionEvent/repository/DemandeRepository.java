package com.team.alpha.backGestionEvent.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import java.util.Date;

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

    // List<Evenement> findByTarif(@Param("tarif") String tarif);

    // List<Evenement> findByDate(Date date);

    // @Query("select * from Car where model= ?1")
    // List<Evenement> findByModel(@Param("model") String model);

}