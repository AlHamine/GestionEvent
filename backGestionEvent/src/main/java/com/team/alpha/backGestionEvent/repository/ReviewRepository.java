package com.team.alpha.backGestionEvent.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.team.alpha.backGestionEvent.model.Review;

public interface ReviewRepository extends JpaRepository<Review, Long> {

}