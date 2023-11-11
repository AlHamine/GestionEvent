package com.team.alpha.backGestionEvent.repository;

<<<<<<< HEAD
=======
import java.util.Optional;

>>>>>>> 27aa8ab (Revision du projet dans le github)
import org.springframework.data.repository.CrudRepository;

import com.team.alpha.backGestionEvent.model.Prestataire;

/**
 * ClientRepository
 */
public interface PrestataireRepository extends CrudRepository<Prestataire, Long> {
<<<<<<< HEAD

=======
    Optional<Prestataire> findByMail(String mail);
>>>>>>> 27aa8ab (Revision du projet dans le github)
}