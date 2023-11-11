package com.team.alpha.backGestionEvent.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.team.alpha.backGestionEvent.model.Evenement;
import com.team.alpha.backGestionEvent.repository.EvenementRepository;

@Service
public class EventService {
    @Autowired
    EvenementRepository eRepository;

    @Autowired
    public EventService(EvenementRepository eRepository) {
        this.eRepository = eRepository;
    }

    public Iterable<Evenement> getAllClients() {
        return eRepository.findAll();
    }

    public Evenement createEvent(Evenement E) {
        return eRepository.save(E);
    }

}
