package com.team.alpha.backGestionEvent.model;

<<<<<<< HEAD
<<<<<<< HEAD
import org.springframework.beans.factory.annotation.Autowired;

<<<<<<< HEAD
=======
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
>>>>>>> e2d9b8a (Ajout de la fonctionnalite de demande de prestation)
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
<<<<<<< HEAD
<<<<<<< HEAD
import com.team.alpha.backGestionEvent.service.UserService;

=======
>>>>>>> 3145185 (Revision de la structure du backend)
=======
import jakarta.persistence.Column;
>>>>>>> cfe2644 (Update Logout et Login maintien des user , create event)
=======

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
>>>>>>> 8e0880c (Backend updated)
=======
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
>>>>>>> 27aa8ab (Revision du projet dans le github)
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;

/**
 * Prestataire
 */
@JsonIgnoreProperties({ "hibernateLazyInitializer", "handler" })

@Entity
public class Prestataire {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long idp;
    private String nom;
    private String prenom;
    private String service;
    private String password;
    @Column(nullable = false, unique = true)
    private String mail;

    private String photo;
<<<<<<< HEAD
=======
    // Pour pouvoir ajouter la note a prestataire
    // **************************************************
    private Integer note = 0; // Initialisation de la note
    // **************************************************
<<<<<<< HEAD
>>>>>>> 27aa8ab (Revision du projet dans le github)

=======
    private String role = "prestataire";
>>>>>>> a9816e1 (mise mineur acceptation Demande)
    // @ManyToOne
    // @JoinColumn(name = "evenement")
    @ManyToMany(cascade = CascadeType.MERGE)
    private List<Evenement> evenement;
    @JsonIgnore
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "prestataire")
    private List<Demande> requetes;

    // private Evenement event=null;
    public Prestataire() {
        // this.role = "prestataire";
    }

    public Prestataire(String nom, String prenom, String service, String mail, String photo, String password)
            throws Exception {
        // final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        this.nom = nom;
        this.prenom = prenom;
        this.service = service;
        this.mail = mail;
        this.photo = photo;
        this.password = password;
        // this.evenement = event;

        // User user = userService.createUser(mail, password, photo, "prestataire");
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

<<<<<<< HEAD
<<<<<<< HEAD
    public Evenement getEvenement() {
        return evenement;
    }

    public void setEvenement(Evenement evenement) {
        this.evenement = evenement;
    }

<<<<<<< HEAD
<<<<<<< HEAD
=======
=======
>>>>>>> 27aa8ab (Revision du projet dans le github)
=======
>>>>>>> 7e33b82 (Mise a jour majeur->ameliorer la coherence)
=======
>>>>>>> d21b587 (Redefinir les entites pour gerer l'insertions des photos de profils.)
    public Integer getNote() {
        return note;
    }

    public void setRating(Integer note) {
        this.note = note;
    }

    public long getIdp() {
        return idp;
    }

<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> 8e0880c (Backend updated)
=======
=======
>>>>>>> 27aa8ab (Revision du projet dans le github)
    public void setIdp(long idp) {
        this.idp = idp;
    }

    public void setNote(Integer note) {
        this.note = note;
    }

    public List<Demande> getRequetes() {
        return requetes;
    }

    public void setRequetes(List<Demande> requetes) {
        this.requetes = requetes;
    }

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> e2d9b8a (Ajout de la fonctionnalite de demande de prestation)
=======
>>>>>>> 27aa8ab (Revision du projet dans le github)
=======
=======
>>>>>>> d21b587 (Redefinir les entites pour gerer l'insertions des photos de profils.)
    public List<Evenement> getEvenement() {
        return evenement;
    }

    public void setEvenement(List<Evenement> evenement) {
        this.evenement = evenement;
    }

    public void ajoutEvenement(Evenement E) {
        if (!this.evenement.contains(E))
            this.evenement.add(E);

    }

<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> 7e33b82 (Mise a jour majeur->ameliorer la coherence)
=======
>>>>>>> d21b587 (Redefinir les entites pour gerer l'insertions des photos de profils.)
=======
    public void ajoutDemande(Demande E) {
        if (!this.requetes.contains(E))
            this.requetes.add(E);

    }

    public void suprimerDemande(Demande d) {
        if (!this.requetes.contains(d))
            this.requetes.remove(d);
    }
>>>>>>> d72ab0d (Mise a jour=>Gestion des Demandes de prestations)
}