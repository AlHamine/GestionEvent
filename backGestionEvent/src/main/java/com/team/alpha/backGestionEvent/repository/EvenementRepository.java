package com.team.alpha.backGestionEvent.repository;

import org.springframework.data.repository.CrudRepository;

import com.team.alpha.backGestionEvent.model.Evenement;

/**
 * ClientRepository
 */
public interface EvenementRepository extends CrudRepository<Evenement,Long> {

    
} 