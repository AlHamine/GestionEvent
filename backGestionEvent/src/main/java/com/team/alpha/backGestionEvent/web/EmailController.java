package com.team.alpha.backGestionEvent.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.team.alpha.backGestionEvent.model.Email;
import com.team.alpha.backGestionEvent.service.EmailService;

@RestController
public class EmailController {

    @Autowired
    private EmailService emailService;

    @PostMapping("/reponses")
    public ResponseEntity<Void> sendReponse(
            @RequestParam("emailPrestataire") String emailPrestataire,
            @RequestParam("emailClient") String emailClient,
            @RequestParam("objet") String objet,
            @RequestParam("message") String message) {

        // Pensez à vérifier que le prestataire est connecté
        // A developper apres

        // Vérifier que les informations de l'expéditeur et du destinataire sont
        // correctes
        if (!emailPrestataire.contains("@") || !emailClient.contains("@")) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }

        // Envoyer l'email
        emailService.sendMail(
                new Email(emailPrestataire, emailClient, objet, message));

        // Renvoyer une réponse HTTP avec le code de statut 200
        return ResponseEntity.status(HttpStatus.OK).build();
    }
}
