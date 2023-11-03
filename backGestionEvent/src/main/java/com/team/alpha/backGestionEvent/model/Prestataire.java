package com.team.alpha.backGestionEvent.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
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
    // @ManyToOne
    // @JoinColumn(name = "evenement")
    @ManyToOne
    @JoinColumn(name = "evenement_id")
    private Evenement evenement ;

    // private Evenement event=null;
    public Prestataire() {

    }

    public Prestataire(String nom, String prenom, String service) {
        super();
        this.nom = nom;
        this.prenom = prenom;
        this.service = service;
        // this.evenement = event;
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

}