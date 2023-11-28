package com.team.alpha.backGestionEvent.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

/**
 * Demande
 */
@JsonIgnoreProperties({ "hibernateLazyInitializer", "handler" })

@Entity
public class Demande {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long idDemande;
    @ManyToOne
    @JoinColumn(name = "client_id")
    private Client client;
    @ManyToOne
    @JoinColumn(name = "prestataire_id")
    private Prestataire prestataire;
    @ManyToOne
    @JoinColumn(name = "evenement_id")
    private Evenement evenement;
    private String status;

    public Demande() {
        super();
    }

    public Demande(Client client, Prestataire prestataire, Evenement evenement) {
        this.client = client;
        this.prestataire = prestataire;
        this.evenement = evenement;
        this.status = "EN_ATTENTE";
    }

    public long getIdDemande() {
        return idDemande;
    }

    public void setIdDemande(long idDemande) {
        this.idDemande = idDemande;
    }

    public Client getClient() {
        return client;
    }

    public void setClient(Client client) {
        this.client = client;
    }

    public Prestataire getPrestataire() {
        return prestataire;
    }

    public void setPrestataire(Prestataire prestataire) {
        this.prestataire = prestataire;
    }

    public String getStaus() {
        return status;
    }

    public void setStaus(String staus) {
        this.status = staus;
    }

    public Evenement getEvenement() {
        return evenement;
    }

    public void setEvenement(Evenement evenement) {
        this.evenement = evenement;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (obj == null)
            return false;
        if (getClass() != obj.getClass())
            return false;
        Demande other = (Demande) obj;
        if (idDemande != other.idDemande)
            return false;
        if (client == null) {
            if (other.client != null)
                return false;
        } else if (!client.equals(other.client))
            return false;
        if (prestataire == null) {
            if (other.prestataire != null)
                return false;
        } else if (!prestataire.equals(other.prestataire))
            return false;
        if (evenement == null) {
            if (other.evenement != null)
                return false;
        } else if (!evenement.equals(other.evenement))
            return false;
        if (status == null) {
            if (other.status != null)
                return false;
        } else if (!status.equals(other.status))
            return false;
        return true;
    }

    
}