package com.team.alpha.backGestionEvent.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.team.alpha.backGestionEvent.model.Review;

public interface ReviwRepository extends JpaRepository<Review, Long> {

}