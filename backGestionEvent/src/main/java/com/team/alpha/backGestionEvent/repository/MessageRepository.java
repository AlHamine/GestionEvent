package com.team.alpha.backGestionEvent.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import com.team.alpha.backGestionEvent.model.Client;
import com.team.alpha.backGestionEvent.model.Demande;
import com.team.alpha.backGestionEvent.model.Message;

/**
 * ClientRepository
 */
public interface MessageRepository extends CrudRepository<Message, Long> {
    // Il faudra utiliser le mail a la place de username
    // Optional<Client> findByMail(String mail);

    @Query(value = "SELECT d.* FROM message d WHERE d.dest= :m  ORDER BY d.timestamp DESC LIMIT 5;", nativeQuery = true)
    List<Message> mesMessage(@Param("m") String mail);

        @Query(value = "SELECT d.* FROM message d WHERE (d.source= :m and d.dest= :des)  or (d.source= :des and d.dest= :m)", nativeQuery = true)
    List<Message> dialogue(@Param("m") String mail,@Param("des") String dest);

}