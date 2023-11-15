package com.team.alpha.backGestionEvent.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.team.alpha.backGestionEvent.model.Evenement;
import com.team.alpha.backGestionEvent.service.EventService;

@RestController
@RequestMapping("/event")

public class EventController {

    @Autowired
    private EventService eService;

    @GetMapping
    public Iterable<Evenement> getAllClients() {
        return eService.getAllClients();
    }

    @PostMapping
    public Evenement createClient(@RequestBody Evenement E) throws Exception {
        return eService.createEvent(E);
    }

}
