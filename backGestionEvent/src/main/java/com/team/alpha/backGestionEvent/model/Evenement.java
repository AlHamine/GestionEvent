package com.team.alpha.backGestionEvent.model;

import java.util.List;
import java.util.ArrayList;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
// import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
// import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
// import java.time.LocalDateTime;
import java.util.Date;

/**
 * Evenement
 */
@Entity
public class Evenement {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String nom;
    private Date date;
    private String desciption;
    private String lieu;
    // @ManyToOne(fetch = FetchType.LAZY)
    @ManyToOne
    @JoinColumn(name = "organisateur_id")
    private Client organisateur;

    @JsonIgnore
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "evenement")
    private List<Prestataire> prestataires;

    public Evenement() {

    }

    public Evenement(String nom, Date date, String desciption, String lieu, Client organisateur) {
        this.nom = nom;
        this.date = date;
        this.desciption = desciption;
        this.lieu = lieu;
        this.organisateur = organisateur;
        this.prestataires = new ArrayList<Prestataire>();
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

    public String getDesciption() {
        return desciption;
    }

    public void setDesciption(String desciption) {
        this.desciption = desciption;
    }

    public String getLieu() {
        return lieu;
    }

    public void setLieu(String lieu) {
        this.lieu = lieu;
    }

    public Client getOrganisateur() {
        return organisateur;
    }

    public void setOrganisateur(Client organisateur) {
        this.organisateur = organisateur;
    }

    public List<Prestataire> getPrestataires() {
        return prestataires;
    }

    public void ajouterPrestataire( Prestataire p) {
        this.prestataires.add(p);
    }
    public void setPrestataires(List<Prestataire> prestataires) {
        this.prestataires = prestataires;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

}

// Maty NDOYE