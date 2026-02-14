package com.team.alpha.backGestionEvent.repository;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import com.team.alpha.backGestionEvent.model.Review;

public interface ReviwRepository extends JpaRepository<Review, Long> {


   
    @Query(value = " select r.* from review r where email_prestataire =:mailP", nativeQuery = true)
    List<Review> commentListeByPrestataire(@Param("mailP") String mailP);


}