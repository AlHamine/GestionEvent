package com.team.alpha.backGestionEvent.repository;

import org.springframework.data.repository.CrudRepository;

import com.team.alpha.backGestionEvent.model.Client;

/**
 * ClientRepository
 */
public interface ClientRepository extends CrudRepository<Client,Long> {

    
} 