package com.team.alpha.backGestionEvent.model;

import org.springframework.beans.factory.annotation.Autowired;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.team.alpha.backGestionEvent.service.UserService;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

/**
 * Prestataire
 */
@JsonIgnoreProperties({ "hibernateLazyInitializer", "handler" })

@Entity
public class Prestataire {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String nom;
    private String prenom;
    private String service;
    private String password;
    private String mail;
    private String photo;

    // @ManyToOne
    // @JoinColumn(name = "evenement")
    @ManyToOne
    @JoinColumn(name = "evenement_id")
    private Evenement evenement;

    // private Evenement event=null;
    public Prestataire() {

    }

    public Prestataire(String nom, String prenom, String service, String mail, String photo)
            throws Exception {
        this.nom = nom;
        this.prenom = prenom;
        this.service = service;
        this.mail = mail;
        this.photo = photo;
        // this.evenement = event;

        // User user = userService.createUser(mail, password, photo, "prestataire");
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getPrenom() {
        return prenom;
    }

    public void setPrenom(String prenom) {
        this.prenom = prenom;
    }

    public String getService() {
        return service;
    }

    public void setService(String service) {
        this.service = service;
    }

    public Evenement getEventActuel() {
        return evenement;
    }

    public void setEventActuel(Evenement eventActuel) {
        this.evenement = eventActuel;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getMail() {
        return mail;
    }

    public void setMail(String mail) {
        this.mail = mail;
    }

    public String getPhoto() {
        return photo;
    }

    public void setPhoto(String photo) {
        this.photo = photo;
    }

    public Evenement getEvenement() {
        return evenement;
    }

    public void setEvenement(Evenement evenement) {
        this.evenement = evenement;
    }

}