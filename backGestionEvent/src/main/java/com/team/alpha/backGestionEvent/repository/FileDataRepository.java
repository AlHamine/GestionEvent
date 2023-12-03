package com.team.alpha.backGestionEvent.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.team.alpha.backGestionEvent.model.FileData;

public interface FileDataRepository extends JpaRepository<FileData, Long> {

    Optional<FileData> findByName(String fileName);
}
