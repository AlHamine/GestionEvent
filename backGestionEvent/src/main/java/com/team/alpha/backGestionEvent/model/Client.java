package com.team.alpha.backGestionEvent.model;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import java.util.ArrayList;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.team.alpha.backGestionEvent.service.UserService;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

/**
 * Client
 */

@Entity
public class Client {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long idc;
    private String nom;
    private String prenom;
    private String password;
    @Column(nullable = false, unique = true)
    private String mail;
    private String photo;
    // private String role1 = "client";

    @JsonIgnore
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "organisateur")
    private List<Evenement> events;
    @JsonIgnore
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "client")
    private List<Demande> requetes;

    // private
    public Client() {
        // this.role1 = "client";
    }

    // @Autowired
    // private UserService userService; // Injectez le service UserService.

    public Client(long idc, String nom, String prenom, String mail) {
        this.idc = idc;
        this.nom = nom;
        this.prenom = prenom;
        this.mail = mail;
        // this.role1 = "client";
    }

    public Client(long idc) {
        this.idc = idc;
    }

    public Client(String nom, String prenom, String password, String mail, String photo) throws Exception {
        this.nom = nom;
        this.prenom = prenom;
        this.mail = mail;
        this.photo = photo;
        this.password = password;
        // this.role1 = "client";
        // User user = userService.createUser(mail, password, photo, "client");

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

    public String getMail() {
        return mail;
    }

    public void setMail(String mail) {
        this.mail = mail;
    }

    public List<Evenement> getEvents() {
        return events;
    }

    public void setEvents(List<Evenement> events) {
        this.events = events;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getPhoto() {
        return photo;
    }

    public void setPhoto(String photo) {
        this.photo = photo;
    }

    public Client orElseThrow(Object object) {
        return null;
    }

    public long getIdc() {
        return idc;
    }

    public void setIdc(long idc) {
        this.idc = idc;
    }

    public List<Demande> getRequetes() {
        return requetes;
    }

    public void setRequetes(List<Demande> requetes) {
        this.requetes = requetes;
    }

    public void ajoutDemande(Demande E) {
        if (!this.requetes.contains(E))
            this.requetes.add(E);

    }

    public void suprimerDemande(Demande d) {
        if (!this.requetes.contains(d))
            this.requetes.remove(d);
    }

}