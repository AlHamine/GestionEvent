package com.team.alpha.backGestionEvent.repository;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;

import com.team.alpha.backGestionEvent.model.Client;

/**
 * ClientRepository
 */
public interface ClientRepository extends CrudRepository<Client,Long> {
// Il faudra utiliser le mail a la place de username
    Optional<Client> findByMail(String mail);

    
} 