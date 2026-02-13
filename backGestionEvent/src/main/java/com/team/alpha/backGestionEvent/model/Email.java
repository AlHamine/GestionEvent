package com.team.alpha.backGestionEvent.model;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

public class Email {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String emailPrestataire;
    private String emailClient;
    private String objet;
    private String message;
    // private String passwordEmailPrestataire;

    public Email() {
    }

    public Email(String emailPrestataire, String emailClient, String objet, String message) {
        this.emailPrestataire = emailPrestataire;
        // this.passwordEmailPrestataire = passwordEmailPrestataire;
        this.emailClient = emailClient;
        this.objet = objet;
        this.message = message;
    }

    public String getEmailPrestataire() {
        return emailPrestataire;
    }

    public void setEmailPrestataire(String emailPrestataire) {
        this.emailPrestataire = emailPrestataire;
    }

    public String getEmailClient() {
        return emailClient;
    }

    public void setEmailClient(String emailClient) {
        this.emailClient = emailClient;
    }

    public String getObjet() {
        return objet;
    }

    public void setObjet(String objet) {
        this.objet = objet;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public long getId() {
        return id;
    }

}
