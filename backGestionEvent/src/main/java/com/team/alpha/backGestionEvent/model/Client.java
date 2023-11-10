package com.team.alpha.backGestionEvent.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
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
    private long id;
    private String nom;
    private String prenom;
    private String password;
    private String mail;
    private String photo;
    @JsonIgnore
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "organisateur")
    private List<Evenement> events;

    // private
    public Client() {

    }

    // @Autowired
    // private UserService userService; // Injectez le service UserService.

    public Client(String nom, String prenom, String password, String mail, String photo) throws Exception {
        this.nom = nom;
        this.prenom = prenom;
        this.mail = mail;
        this.photo = photo;
        this.password = password;

        // User user = userService.createUser(mail, password, photo, "client");

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

}