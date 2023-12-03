package com.team.alpha.backGestionEvent.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
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
    // Pour pouvoir ajouter la note a prestataire
    // **************************************************
    private Integer note = 0; // Initialisation de la note
    // **************************************************
    private String role = "prestataire";
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

    public Integer getNote() {
        return note;
    }

    public long getIdp() {
        return idp;
    }

    public void setIdp(long idp) {
        this.idp = idp;
    }

    // Controller l'ajout de la note avant chaque mise a jour
    public void setNote(Integer note) {
        if (note >= 1 && note <= 5) {
            this.note = note;
        }

    }

    public List<Demande> getRequetes() {
        return requetes;
    }

    public void setRequetes(List<Demande> requetes) {
        this.requetes = requetes;
    }

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

    public void ajoutDemande(Demande E) {
        if (!this.requetes.contains(E))
            this.requetes.add(E);

    }

    public void suprimerDemande(Demande d) {
        if (!this.requetes.contains(d))
            this.requetes.remove(d);
    }
}