package com.team.alpha.backGestionEvent.repository;

import java.util.List;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import java.util.Date;
import com.team.alpha.backGestionEvent.model.Evenement;

/**
 * ClientRepository
 */
@RepositoryRestResource
public interface EvenementRepository extends CrudRepository<Evenement, Long> {
    List<Evenement> findByLieu(@Param("lieu") String lieu);

    // List<Evenement> findByTarif(@Param("tarif") String tarif);

    List<Evenement> findByDate(Date date);

    // @Query("select * from Car where model= ?1")
    // List<Evenement> findByModel(@Param("model") String model);

}