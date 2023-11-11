package com.team.alpha.backGestionEvent.repository;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;

import com.team.alpha.backGestionEvent.model.Prestataire;

/**
 * ClientRepository
 */
public interface PrestataireRepository extends CrudRepository<Prestataire, Long> {
    Optional<Prestataire> findByMail(String mail);
}